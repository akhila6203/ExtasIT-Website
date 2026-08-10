<?php

declare(strict_types=1);

$activeNav = $activeNav ?? '';
$admin = adminSession();
?>
<aside class="admin-sidebar" id="adminSidebar">
  <div class="admin-sidebar-brand">
    <div class="admin-brand-card">
      <img src="<?= base_url('/assets/logo2.png') ?>" alt="ExtasIT">
    </div>
  </div>

  <nav class="admin-sidebar-nav" aria-label="Admin navigation">
    <a href="<?= base_url('/admin/dashboard.php') ?>" class="admin-nav-link<?= $activeNav === 'dashboard' ? ' active' : '' ?>">
      <i class="fa-solid fa-chart-pie"></i>
      <span>Dashboard</span>
      <?php if ($activeNav === 'dashboard'): ?><i class="fa-solid fa-chevron-right nav-arrow"></i><?php endif; ?>
    </a>
    <a href="<?= base_url('/admin/jobs.php') ?>" class="admin-nav-link<?= $activeNav === 'jobs' ? ' active' : '' ?>">
      <i class="fa-solid fa-briefcase"></i>
      <span>Jobs</span>
      <?php if ($activeNav === 'jobs'): ?><i class="fa-solid fa-chevron-right nav-arrow"></i><?php endif; ?>
    </a>
    <a href="<?= base_url('/admin/applications.php') ?>" class="admin-nav-link<?= $activeNav === 'applications' ? ' active' : '' ?>">
      <i class="fa-solid fa-file-lines"></i>
      <span>Applications</span>
      <?php if ($activeNav === 'applications'): ?><i class="fa-solid fa-chevron-right nav-arrow"></i><?php endif; ?>
    </a>

    <a href="<?= base_url('/admin/profile.php') ?>" class="admin-nav-link<?= $activeNav === 'profile' ? ' active' : '' ?>">
      <i class="fa-solid fa-user"></i>
      <span>Profile</span>
      <?php if ($activeNav === 'profile'): ?><i class="fa-solid fa-chevron-right nav-arrow"></i><?php endif; ?>
    </a>

  </nav>

  <div class="admin-sidebar-bottom">
    <div class="admin-sidebar-user">
      <span class="admin-sidebar-avatar"><?= strtoupper(substr($admin['name'] ?: 'A', 0, 1)) ?></span>
      <div>
        <strong><?= htmlspecialchars($admin['name']) ?></strong>
        <span>Admin</span>
      </div>
    </div>
    <a href="<?= base_url('/admin/logout.php') ?>" class="admin-sidebar-logout">
      <i class="fa-solid fa-right-from-bracket"></i> Sign Out
    </a>
  </div>
</aside>
