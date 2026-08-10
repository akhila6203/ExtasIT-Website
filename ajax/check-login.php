<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

header('Content-Type: application/json; charset=UTF-8');

jsonResponse([
    'success' => true,
    'logged_in' => isAdminLoggedIn(),
    'admin' => isAdminLoggedIn() ? adminSession() : null,
]);
