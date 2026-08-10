<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

requireAdmin();

header('Content-Type: application/json; charset=UTF-8');

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = max(5, min(50, (int) ($_GET['limit'] ?? 10)));
$search = sanitize($_GET['search'] ?? '');
$sort = sanitize($_GET['sort'] ?? 'created_at');
$order = strtoupper(sanitize($_GET['order'] ?? 'DESC')) === 'ASC' ? 'ASC' : 'DESC';

$allowedSort = ['id', 'title', 'company', 'location', 'experience', 'status', 'created_at'];
if (!in_array($sort, $allowedSort, true)) {
    $sort = 'created_at';
}

$offset = ($page - 1) * $limit;
$where = '';
$params = [];
$types = '';

if ($search !== '') {
    $where = ' WHERE title LIKE ? OR company LIKE ? OR location LIKE ?';
    $like = '%' . $search . '%';
    $params = [$like, $like, $like];
    $types = 'sss';
}

$countSql = 'SELECT COUNT(*) AS total FROM jobs' . $where;
$countStmt = db()->prepare($countSql);
if ($types !== '') {
    $countStmt->bind_param($types, ...$params);
}
$countStmt->execute();
$total = (int) $countStmt->get_result()->fetch_assoc()['total'];

$sql = "SELECT id, job_id, title, company, location, experience, job_type, salary_min, salary_max,
               description, requirements, responsibilities, benefits, vacancies, status, created_at
        FROM jobs{$where} ORDER BY {$sort} {$order} LIMIT ? OFFSET ?";

$stmt = db()->prepare($sql);
if ($types !== '') {
    $typesWithLimit = $types . 'ii';
    $paramsWithLimit = [...$params, $limit, $offset];
    $stmt->bind_param($typesWithLimit, ...$paramsWithLimit);
} else {
    $stmt->bind_param('ii', $limit, $offset);
}

$stmt->execute();
$result = $stmt->get_result();
$jobs = [];

while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

jsonResponse([
    'success' => true,
    'jobs' => $jobs,
    'pagination' => [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'pages' => (int) ceil($total / $limit),
    ],
]);
