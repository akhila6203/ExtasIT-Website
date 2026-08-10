<?php

declare(strict_types=1);

define('BASE_URL', '/ExtasIT');

function base_url(string $path = ''): string {
    $normalized = '/' . ltrim($path, '/');
    return BASE_URL . ($normalized === '/' ? '' : $normalized);
}


// <?php

// declare(strict_types=1);

// if (!defined('BASE_URL')) {
//     $host = $_SERVER['HTTP_HOST'] ?? '';

//     if (
//         $host === 'localhost' ||
//         str_starts_with($host, '127.0.0.1')
//     ) {
//         define('BASE_URL', '/ExtasIT');
//     } else {
//         define('BASE_URL', '');
//     }
// }

// function base_url(string $path = ''): string
// {
//     $normalized = '/' . ltrim($path, '/');

//     return BASE_URL . ($normalized === '/' ? '' : $normalized);
// }