(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", async () => {
    const recentBody = document.getElementById("recentApplicationsBody");
    const activeJobsList = document.getElementById("activeJobsList");

    try {
      AdminPanel.showSpinner(true);
      const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/load-dashboard.php`);

      if (!data.success) {
        throw new Error(data.message || "Unable to load dashboard.");
      }

      document.getElementById("statTotalJobs").textContent = data.stats.total_jobs;
      document.getElementById("statTotalApplications").textContent = data.stats.total_applications;
      document.getElementById("statViewsToday").textContent = data.stats.views_today;
      document.getElementById("statHireRate").textContent = `${data.stats.hire_rate}%`;
      document.getElementById("statActiveJobs").textContent =
        `${data.active_jobs?.length || 0} active`;

      if (data.recent_applications?.length) {
        recentBody.innerHTML = data.recent_applications
          .map(
            (app) => `
              <tr>
                <td>${AdminPanel.escapeHtml(app.full_name)}</td>
                <td>${AdminPanel.escapeHtml(app.job_title)}</td>
                <td>${AdminPanel.escapeHtml(app.experience || "—")}</td>
                <td>${AdminPanel.statusBadge(app.status)}</td>
                <td>${AdminPanel.formatDate(app.created_at)}</td>
              </tr>
            `
          )
          .join("");
      } else {
        recentBody.innerHTML = `<tr><td colspan="5" class="empty-cell">No applications yet.</td></tr>`;
      }

      if (data.active_jobs?.length) {
        activeJobsList.innerHTML = data.active_jobs
          .map(
            (job) => `
              <div class="panel-list-item">
                <div>
                  <strong>${AdminPanel.escapeHtml(job.title)}</strong>
                  <span>${AdminPanel.escapeHtml(job.location)} · ${job.applicants} applicant(s)</span>
                </div>
                ${AdminPanel.statusBadge(job.status)}
              </div>
            `
          )
          .join("");
      } else {
        activeJobsList.innerHTML = `<div class="empty-cell">No active jobs posted.</div>`;
      }
    } catch (error) {
      recentBody.innerHTML = `<tr><td colspan="5" class="empty-cell">Failed to load dashboard.</td></tr>`;
      activeJobsList.innerHTML = `<div class="empty-cell">Failed to load jobs.</div>`;
      AdminPanel.showToast(error.message || "Dashboard load failed.", "error");
    } finally {
      AdminPanel.showSpinner(false);
    }
  });
})();
