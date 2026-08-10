<?php

declare(strict_types=1);

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/auth.php';

$admin = adminSession();
$pageTitle = $pageTitle ?? 'Dashboard';
$activeNav = $activeNav ?? 'dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?> | ExtasIT Admin</title>
  <link rel="icon" type="image/jpeg" href="<?= base_url('/assets/extasit-logo.png') ?>">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="<?= base_url('/css/panel.css') ?>">
</head>
<body class="admin-body">
<div class="admin-layout">
<?php require __DIR__ . '/sidebar.php'; ?>
<div class="admin-main">
  <header class="admin-topbar">
    <div class="admin-topbar-left">
      <button type="button" class="admin-menu-toggle" id="sidebarToggle" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div>
        <h1 class="admin-page-title"><?= htmlspecialchars($pageTitle) ?></h1>
        <?php if (!empty($pageSubtitle)): ?>
          <p class="admin-page-subtitle"><?= htmlspecialchars($pageSubtitle) ?></p>
        <?php endif; ?>
      </div>
    </div>
    <div class="admin-topbar-right">
      <div class="admin-profile-dropdown" id="adminProfileDropdown">
        <button type="button" class="admin-profile-btn" id="adminProfileBtn">
          <span class="admin-avatar"><?= strtoupper(substr($admin['name'] ?: 'A', 0, 1)) ?></span>
          <span class="admin-profile-name"><?= htmlspecialchars($admin['name']) ?></span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="admin-profile-menu" id="adminProfileMenu">
            <a href="<?= base_url('/admin/profile.php') ?>">
            <i class="fa-solid fa-user"></i> Profile</a>
            <a href="<?= base_url('/admin/logout.php') ?>">
            <i class="fa-solid fa-right-from-bracket"></i> Logout</a>
        </div>
      </div>
    </div>
  </header>
  <main class="admin-content">
