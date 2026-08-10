<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/auth.php';
requireAdmin();

$pageTitle = 'Jobs';
$pageSubtitle = 'Manage job postings';
$activeNav = 'jobs';
$pageScript = 'jobs-admin.js';

require __DIR__ . '/includes/header.php';
?>

<div class="page-toolbar">
  <div>
    <p class="toolbar-meta" id="jobsCountMeta">0 jobs posted</p>
  </div>
  <div class="toolbar-actions">
    <button type="button" class="btn btn-outline" id="refreshJobsBtn">
      <i class="fa-solid fa-rotate"></i> Refresh
    </button>
    <button type="button" class="btn btn-primary" id="addJobBtn">
      <i class="fa-solid fa-plus"></i> Post New Job
    </button>
  </div>
</div>

<div class="panel-card">
  <div class="table-toolbar">
    <div class="search-box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" id="jobsSearch" placeholder="Search jobs..." aria-label="Search jobs">
    </div>
    <div class="table-controls">
      <label>
        Sort
        <select id="jobsSort">
          <option value="created_at|DESC">Newest</option>
          <option value="created_at|ASC">Oldest</option>
          <option value="title|ASC">Title A-Z</option>
          <option value="title|DESC">Title Z-A</option>
          <option value="company|ASC">Company A-Z</option>
        </select>
      </label>
    </div>
  </div>

  <div class="panel-table-wrap">
    <table class="panel-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Experience</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="jobsTableBody">
        <tr><td colspan="9" class="empty-cell">Loading jobs...</td></tr>
      </tbody>
    </table>
  </div>

  <div class="empty-state" id="jobsEmptyState" hidden>
    <p>You haven't posted any jobs yet.</p>
    <button type="button" class="btn btn-primary" id="emptyAddJobBtn">
      <i class="fa-solid fa-plus"></i> Post Your First Job
    </button>
  </div>

  <div class="table-pagination">

    <div class="rows-per-page">
        <span>Rows per page:</span>

        <select id="jobsRowsPerPage">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </select>
    </div>

    <div class="pagination-info" id="jobsPaginationInfo"></div>

    <div class="pagination" id="jobsPagination">
    </div>

</div>
  <!-- <div class="pagination" id="jobsPagination"></div> -->
</div>

<div class="panel-modal" id="jobFormModal" hidden>
  <div class="panel-modal-backdrop" data-close-modal></div>
  <div class="panel-modal-panel">
    <div class="panel-modal-header">
      <div>
        <h2 id="jobFormTitle">Post New Job</h2>
        <p>Fill in the job details below</p>
      </div>
      <button type="button" class="panel-drawer-close" data-close-modal aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <form id="jobForm" class="panel-form">
      <input type="hidden" name="id" id="jobId">
      <div class="form-grid two-col">
        <div class="form-group">
          <label for="jobCode">Job ID <span>*</span></label>
          <input
              type="text"
              id="jobCode"
              name="job_id"
              placeholder="Ex: LR001"
              required
          >
      </div>
        <div class="form-group">
          <label for="jobTitle">Job Title <span>*</span></label>
          <input type="text" id="jobTitle" name="title" placeholder="e.g. Senior React Developer" required>
        </div>
        <div class="form-group">
          <label for="jobCompany">Company <span>*</span></label>
          <input type="text" id="jobCompany" name="company" placeholder="e.g. Lares IT Solutions" required>
        </div>
        <div class="form-group">
          <label for="jobLocation">Location <span>*</span></label>
          <input type="text" id="jobLocation" name="location" placeholder="e.g. Detroit, MI" required>
        </div>
        <div class="form-group">
          <label for="jobExperience">Experience Required</label>
          <input type="text" id="jobExperience" name="experience" placeholder="e.g. 3-5 years">
        </div>
        <div class="form-group">
          <label for="jobType">Job Type</label>
          <select id="jobType" name="job_type">
            <option value="">Select type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div class="form-group">
          <label for="jobVacancies">Vacancies</label>
          <input type="number" id="jobVacancies" name="vacancies" min="1" value="1">
        </div>
        <div class="form-group">
          <label for="salaryMin">Salary Min</label>
          <input type="number" id="salaryMin" name="salary_min" placeholder="e.g. 80000" min="0" step="any">
        </div>
        <div class="form-group">
          <label for="salaryMax">Salary Max</label>
          <input type="number" id="salaryMax" name="salary_max" placeholder="e.g. 120000" min="0" step="any">
        </div>
        <div class="form-group">
          <label for="jobStatus">Status</label>
          <select id="jobStatus" name="status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="jobDescription">Description <span>*</span></label>
        <textarea id="jobDescription" name="description" rows="4" placeholder="Describe the role..." required></textarea>
      </div>
      <div class="form-group">
        <label for="jobRequirements">Requirements</label>
        <textarea id="jobRequirements" name="requirements" rows="3" placeholder="List skills and qualifications..."></textarea>
      </div>
      <div class="form-group">
        <label for="jobResponsibilities">Responsibilities</label>
        <textarea id="jobResponsibilities" name="responsibilities" rows="3" placeholder="Key responsibilities..."></textarea>
      </div>
      <div class="form-group">
        <label for="jobBenefits">Benefits</label>
        <textarea id="jobBenefits" name="benefits" rows="3" placeholder="Benefits and perks..."></textarea>
      </div>
      <div class="panel-modal-footer">
        <button type="button" class="btn btn-outline" data-close-modal>Cancel</button>
        <button type="submit" class="btn btn-primary" id="jobFormSubmit">Post Job</button>
      </div>
    </form>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
