<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/auth.php';
requireAdmin();

$admin = adminSession();
$pageTitle = 'Profile';
$pageSubtitle = 'Your admin account details';
$activeNav = 'profile';

require __DIR__ . '/includes/header.php';
?>

<div class="panel-card profile-card">
  <div class="profile-header">
    <span class="profile-avatar-lg"><?= strtoupper(substr($admin['name'] ?: 'A', 0, 1)) ?></span>
    <div>
      <h2><?= htmlspecialchars($admin['name']) ?></h2>
      <p>Administrator</p>
    </div>
  </div>

  <div class="profile-details">
    <div class="profile-detail-row">
      <span>Username</span>
      <strong><?= htmlspecialchars($admin['username']) ?></strong>
    </div>
    <div class="profile-detail-row">
      <span>Email</span>
      <strong><?= htmlspecialchars($admin['email']) ?></strong>
    </div>
    <div class="profile-detail-row">
      <span>Role</span>
      <strong>Admin</strong>
    </div>
  </div>

  <div class="profile-actions">
      <a href="<?= base_url('/admin/dashboard.php') ?>" class="btn btn-outline">
      <i class="fa-solid fa-chart-pie"></i> Back to Dashboard
    </a>
      <a href="<?= base_url('/admin/logout.php') ?>" class="btn btn-primary">
      <i class="fa-solid fa-right-from-bracket"></i> Logout
    </a>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
