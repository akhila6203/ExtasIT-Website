<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

requireAdmin();

header('Content-Type: application/json; charset=UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

$id = (int) ($_POST['id'] ?? 0);
$status = sanitize($_POST['status'] ?? '');

$allowed = ['Pending', 'Selected', 'Rejected', 'On Hold'];
if ($id <= 0 || !in_array($status, $allowed, true)) {
    jsonResponse(['success' => false, 'message' => 'Invalid request.'], 422);
}

$stmt = db()->prepare('UPDATE applications SET status = ? WHERE id = ?');
$stmt->bind_param('si', $status, $id);

if ($stmt->execute() && $stmt->affected_rows >= 0) {
    jsonResponse(['success' => true, 'message' => 'Status updated successfully.']);
}

jsonResponse(['success' => false, 'message' => 'Unable to update status.'], 500);
