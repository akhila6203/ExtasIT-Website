<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/auth.php';
requireAdmin();

$pageTitle = 'Applications';
$pageSubtitle = 'Review and manage job applications';
$activeNav = 'applications';
$pageScript = 'applications-admin.js';

require __DIR__ . '/includes/header.php';
?>

<div class="page-toolbar">
  <div>
    <p class="toolbar-meta" id="applicationsCountMeta">0 applications received</p>
  </div>
  <div class="toolbar-actions">
    <button type="button" class="btn btn-outline" id="refreshApplicationsBtn">
      <i class="fa-solid fa-rotate"></i> Refresh
    </button>
  </div>
</div>

<div class="panel-card">
  <div class="table-toolbar">
    <div class="search-box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" id="applicationsSearch" placeholder="Search applications..." aria-label="Search applications">
    </div>
  </div>

  <div class="panel-table-wrap">
    <table class="panel-table">
      <thead>
        <tr>
          <th>Applicant</th>
          <th>Job Position</th>
          <th>Experience</th>
          <th>Applied Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="applicationsTableBody">
        <tr><td colspan="6" class="empty-cell">Loading applications...</td></tr>
      </tbody>
    </table>
  </div>

  <div class="table-pagination">

    <div class="rows-per-page">
        <span>Rows per page:</span>

        <select id="applicationsRowsPerPage">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </select>
    </div>

    <div class="pagination-info" id="applicationsPaginationInfo"></div>

    <div class="pagination"
         id="applicationsPagination">
    </div>

</div>
  <!-- <div class="pagination" id="applicationsPagination"></div> -->
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
