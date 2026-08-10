<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/auth.php';
requireAdmin();

$pageTitle = 'Dashboard';
$pageSubtitle = 'Platform analytics and management';
$activeNav = 'dashboard';
$pageScript = 'dashboard.js';

require __DIR__ . '/includes/header.php';
?>

<div class="stats-grid" id="statsGrid">
  <article class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">Total Jobs</span>
      <span class="stat-icon teal"><i class="fa-solid fa-briefcase"></i></span>
    </div>
    <strong class="stat-value" id="statTotalJobs">0</strong>
    <span class="stat-meta" id="statActiveJobs">0 active</span>
  </article>
  <article class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">Total Applications</span>
      <span class="stat-icon teal"><i class="fa-solid fa-file-lines"></i></span>
    </div>
    <strong class="stat-value" id="statTotalApplications">0</strong>
    <span class="stat-meta">All time</span>
  </article>
  <article class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">Views Today</span>
      <span class="stat-icon teal"><i class="fa-solid fa-eye"></i></span>
    </div>
    <strong class="stat-value" id="statViewsToday">0</strong>
    <span class="stat-meta">Job page views</span>
  </article>
  <article class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">Hire Rate</span>
      <span class="stat-icon teal"><i class="fa-solid fa-chart-line"></i></span>
    </div>
    <strong class="stat-value" id="statHireRate">0%</strong>
    <span class="stat-meta">Selected candidates</span>
  </article>
</div>

<div class="dashboard-panels">
  <section class="panel-card">
    <h2>Recent Applications</h2>
    <div class="panel-table-wrap">
      <table class="panel-table compact">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="recentApplicationsBody">
          <tr><td colspan="5" class="empty-cell">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="panel-card">
    <h2>Active Job Postings</h2>
    <div class="panel-list" id="activeJobsList">
      <div class="empty-cell">Loading...</div>
    </div>
  </section>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
