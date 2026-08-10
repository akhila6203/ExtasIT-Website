<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}

function isAdminLoggedIn(): bool { return !empty($_SESSION['admin_id']); }

function requireAdmin(): void {
    if (!isAdminLoggedIn()) {
        $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
        if ($isAjax || str_contains($_SERVER['REQUEST_URI'] ?? '', '/ajax/')) {
            if (function_exists('jsonResponse')) {
                jsonResponse(['success'=>false,'message'=>'Unauthorized'],401);
            }
            http_response_code(401);
            echo json_encode(['success'=>false,'message'=>'Unauthorized'], JSON_UNESCAPED_UNICODE);
            exit;
        }
        header('Location: ' . base_url('/'));
        exit;
    }
}

function adminSession(): array {
    return [
        'id'=>$_SESSION['admin_id'] ?? null,
        'name'=>$_SESSION['admin_name'] ?? 'Admin',
        'email'=>$_SESSION['admin_email'] ?? '',
        'username'=>$_SESSION['admin_username'] ?? '',
    ];
}

function verifyPassword(string $input,string $stored): bool {
    if (password_get_info($stored)['algo'] !== 0) return password_verify($input,$stored);
    return hash_equals($stored,$input);
}
