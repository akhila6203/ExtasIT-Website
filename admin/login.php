<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/auth.php';

if (isAdminLoggedIn()) {
    header('Location: ' . base_url('/admin/dashboard.php'));
    exit;
}

header('Location: ' . base_url('/index.html'));
exit;

