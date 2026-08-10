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

if ($id <= 0) {
    jsonResponse(['success' => false, 'message' => 'Invalid job id.'], 422);
}

$stmt = db()->prepare('DELETE FROM jobs WHERE id = ?');
$stmt->bind_param('i', $id);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    jsonResponse(['success' => true, 'message' => 'Job deleted successfully.']);
}

jsonResponse(['success' => false, 'message' => 'Job not found.'], 404);
