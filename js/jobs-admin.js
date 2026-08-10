(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const jobsTableBody = document.getElementById("jobsTableBody");
    const jobsCountMeta = document.getElementById("jobsCountMeta");
    const jobsEmptyState = document.getElementById("jobsEmptyState");
    const jobsPagination = document.getElementById("jobsPagination");
    const jobsSearch = document.getElementById("jobsSearch");
    const jobsSort = document.getElementById("jobsSort");
    const jobFormModal = document.getElementById("jobFormModal");
    const jobForm = document.getElementById("jobForm");
    const jobFormTitle = document.getElementById("jobFormTitle");
    const jobFormSubmit = document.getElementById("jobFormSubmit");

        const jobsRowsPerPage = document.getElementById("jobsRowsPerPage");
      const jobsPaginationInfo = document.getElementById("jobsPaginationInfo");

    let currentPage = 1;
    let rowsPerPage = 10;

    let searchTimer = null;

    const openJobModal = (mode = "add", job = null) => {
      jobForm.reset();
      document.getElementById("jobId").value = job?.id || "";
      jobFormTitle.textContent = mode === "edit" ? "Edit Job" : "Post New Job";
      jobFormSubmit.textContent = mode === "edit" ? "Update Job" : "Post Job";

      if (job) {
        document.getElementById("jobCode").value = job.job_id || "";
        document.getElementById("jobTitle").value = job.title || "";
        document.getElementById("jobCompany").value = job.company || "";
        document.getElementById("jobLocation").value = job.location || "";
        document.getElementById("jobExperience").value = job.experience || "";
        document.getElementById("jobType").value = job.job_type || "";
        document.getElementById("jobVacancies").value = job.vacancies || 1;
        document.getElementById("salaryMin").value = job.salary_min ?? "";
        document.getElementById("salaryMax").value = job.salary_max ?? "";
        document.getElementById("jobStatus").value = job.status || "Active";
        document.getElementById("jobDescription").value = job.description || "";
        document.getElementById("jobRequirements").value = job.requirements || "";
        document.getElementById("jobResponsibilities").value = job.responsibilities || "";
        document.getElementById("jobBenefits").value = job.benefits || "";
      }

      jobFormModal.hidden = false;
    };

    const closeJobModal = () => {
      jobFormModal.hidden = true;
    };

    const getSortParams = () => {
      const [sort, order] = (jobsSort?.value || "created_at|DESC").split("|");
      return { sort, order };
    };

    const loadJobs = async (page = 1) => {
      console.log("Current rowsPerPage =", rowsPerPage);
      currentPage = page;
      const { sort, order } = getSortParams();
      const search = jobsSearch?.value.trim() || "";
      const params = new URLSearchParams({
        page: String(page),
        limit: rowsPerPage,
        // limit: "10",
        search,
        sort,
        order,
      });
      console.log(params.toString());
      try {
        AdminPanel.showSpinner(true);
        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/load-jobs.php?${params}`);

        if (!data.success) throw new Error(data.message || "Unable to load jobs.");

        jobsCountMeta.textContent = `${data.pagination.total} job(s) posted`;

        const start =
  data.pagination.total === 0
    ? 0
    : (data.pagination.page - 1) * data.pagination.limit + 1;

const end = Math.min(
  data.pagination.page * data.pagination.limit,
  data.pagination.total
);

jobsPaginationInfo.textContent =
`Showing ${start} to ${end} of ${data.pagination.total} results`;

        if (!data.jobs.length) {
          jobsTableBody.innerHTML = `<tr><td colspan="9" class="empty-cell">No jobs found.</td></tr>`;
          jobsEmptyState.hidden = search === "";
        } else {
          jobsEmptyState.hidden = true;
          jobsTableBody.innerHTML = data.jobs
            .map(
              (job) => `
                <tr>
                  <td>#${job.id}</td>
                  <td>
                      <strong>${AdminPanel.escapeHtml(job.title)}</strong><br>
                      <small style="color:#64748b;">
                          
                          ${AdminPanel.escapeHtml(job.job_id)}
                      </small>
                  </td>
                  <td>${AdminPanel.escapeHtml(job.company)}</td>
                  <td>${AdminPanel.escapeHtml(job.location)}</td>
                  <td>${AdminPanel.escapeHtml(job.experience || "—")}</td>
                  <td>${AdminPanel.escapeHtml(AdminPanel.formatSalary(job.salary_min, job.salary_max))}</td>
                  <td>${AdminPanel.statusBadge(job.status)}</td>
                  <td>${AdminPanel.formatDate(job.created_at)}</td>
                  <td>
                    <div class="table-actions">
                      <button type="button" class="btn-icon js-view-job" data-id="${job.id}" title="View"><i class="fa-solid fa-eye"></i></button>
                      <button type="button" class="btn-icon js-edit-job" data-id="${job.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                      <button type="button" class="btn-icon danger js-delete-job" data-id="${job.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              `
            )
            .join("");
        }

        AdminPanel.renderPagination(jobsPagination, data.pagination, loadJobs);
      } catch (error) {
        jobsTableBody.innerHTML = `<tr><td colspan="9" class="empty-cell">Failed to load jobs.</td></tr>`;
        AdminPanel.showToast(error.message || "Failed to load jobs.", "error");
      } finally {
        AdminPanel.showSpinner(false);
      }
    };

    jobsRowsPerPage?.addEventListener("change", function () {

    console.log("Dropdown Changed");

    console.log("Selected Value =", this.value);

    rowsPerPage = Number(this.value);

    console.log("rowsPerPage =", rowsPerPage);

    currentPage = 1;

    loadJobs(currentPage);

});

    const viewJob = async (id) => {
      const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/get-job.php?id=${id}`);
      if (!data.success) {
        AdminPanel.showToast(data.message || "Job not found.", "error");
        return;
      }

      const job = data.job;
      AdminPanel.openDrawer({
        title: job.title,
        // title: job.title,
        subtitle: `${job.company}`,
        bodyHtml: `
          <div class="app-detail-grid">
          <div class="app-detail-row">
              <span>Job ID</span>
              <strong>${AdminPanel.escapeHtml(job.job_id)}</strong>
          </div>
            <div class="app-detail-row"><span>Experience</span><strong>${AdminPanel.escapeHtml(job.experience || "—")}</strong></div>
            <div class="app-detail-row"><span>Job Type</span><strong>${AdminPanel.escapeHtml(job.job_type || "—")}</strong></div>
            <div class="app-detail-row"><span>Salary</span><strong>${AdminPanel.escapeHtml(AdminPanel.formatSalary(job.salary_min, job.salary_max))}</strong></div>
            <div class="app-detail-row"><span>Status</span><strong>${AdminPanel.statusBadge(job.status)}</strong></div>
            <div class="app-detail-row"><span>Posted</span><strong>${AdminPanel.formatDate(job.created_at)}</strong></div>
          </div>
          <div class="app-detail-block"><h3>Description</h3><p>${AdminPanel.escapeHtml(job.description).replace(/\n/g, "<br>")}</p></div>
          ${job.requirements ? `<div class="app-detail-block"><h3>Requirements</h3><p>${AdminPanel.escapeHtml(job.requirements).replace(/\n/g, "<br>")}</p></div>` : ""}
          ${job.responsibilities ? `<div class="app-detail-block"><h3>Responsibilities</h3><p>${AdminPanel.escapeHtml(job.responsibilities).replace(/\n/g, "<br>")}</p></div>` : ""}
          ${job.benefits ? `<div class="app-detail-block"><h3>Benefits</h3><p>${AdminPanel.escapeHtml(job.benefits).replace(/\n/g, "<br>")}</p></div>` : ""}
        `,
        footerHtml: `<button type="button" class="btn btn-outline" onclick="AdminPanel.closeDrawer()">Close</button>`,
      });
    };

    const editJob = async (id) => {
      const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/get-job.php?id=${id}`);
      if (!data.success) {
        AdminPanel.showToast(data.message || "Job not found.", "error");
        return;
      }
      openJobModal("edit", data.job);
    };

    const deleteJob = async (id) => {
      if (!AdminPanel.confirmAction("Are you sure you want to delete this job?")) return;

      const formData = new FormData();
      formData.append("id", id);

      try {
        AdminPanel.showSpinner(true);
        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/delete-job.php`, {
          method: "POST",
          body: formData,
        });

        if (!data.success) throw new Error(data.message || "Delete failed.");
        AdminPanel.showToast(data.message || "Job deleted.");
        loadJobs(currentPage);
      } catch (error) {
        AdminPanel.showToast(error.message || "Delete failed.", "error");
      } finally {
        AdminPanel.showSpinner(false);
      }
    };

    document.getElementById("addJobBtn")?.addEventListener("click", () => openJobModal("add"));
    document.getElementById("emptyAddJobBtn")?.addEventListener("click", () => openJobModal("add"));
    document.getElementById("refreshJobsBtn")?.addEventListener("click", () => loadJobs(currentPage));

    jobFormModal?.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeJobModal);
    });

    jobsSearch?.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => loadJobs(1), 350);
    });

    jobsSort?.addEventListener("change", () => loadJobs(1));

    jobsTableBody?.addEventListener("click", (event) => {
      const viewBtn = event.target.closest(".js-view-job");
      const editBtn = event.target.closest(".js-edit-job");
      const deleteBtn = event.target.closest(".js-delete-job");

      if (viewBtn) viewJob(viewBtn.dataset.id);
      if (editBtn) editJob(editBtn.dataset.id);
      if (deleteBtn) deleteJob(deleteBtn.dataset.id);
    });

    jobForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(jobForm);
      const isEdit = Boolean(formData.get("id"));

      try {
        AdminPanel.showSpinner(true);
        jobFormSubmit.disabled = true;

        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/save-job.php`, {
          method: "POST",
          body: formData,
        });

        if (!data.success) throw new Error(data.message || "Unable to save job.");

        AdminPanel.showToast(data.message || "Job saved.");
        closeJobModal();
        loadJobs(isEdit ? currentPage : 1);
      } catch (error) {
        AdminPanel.showToast(error.message || "Save failed.", "error");
      } finally {
        jobFormSubmit.disabled = false;
        AdminPanel.showSpinner(false);
      }
    });

    loadJobs();
  });
})();
