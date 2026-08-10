(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const applicationsTableBody = document.getElementById("applicationsTableBody");
    const applicationsCountMeta = document.getElementById("applicationsCountMeta");
    const applicationsPagination = document.getElementById("applicationsPagination");
    const applicationsSearch = document.getElementById("applicationsSearch");
    const applicationsRowsPerPage =
document.getElementById("applicationsRowsPerPage");

const applicationsPaginationInfo =
document.getElementById("applicationsPaginationInfo");

let rowsPerPage = 10;

    let currentPage = 1;
    let searchTimer = null;

    const statusOptions = ["Pending", "Selected", "Rejected", "On Hold"];

    const loadApplications = async (page = 1) => {
      currentPage = page;
      const search = applicationsSearch?.value.trim() || "";
      const params = new URLSearchParams({
        page: String(page),
        limit: rowsPerPage,
        // limit: "10",
        search,
      });

      try {
        AdminPanel.showSpinner(true);
        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/load-applications.php?${params}`);

        if (!data.success) throw new Error(data.message || "Unable to load applications.");

        applicationsCountMeta.textContent = `${data.total} application(s) received`;

        const start =
data.pagination.total===0
?0
:(data.pagination.page-1)*data.pagination.limit+1;

const end=Math.min(
data.pagination.page*data.pagination.limit,
data.pagination.total
);

applicationsPaginationInfo.textContent=
`Showing ${start} to ${end} of ${data.pagination.total} results`;

        if (!data.applications.length) {
          applicationsTableBody.innerHTML =
            `<tr><td colspan="6" class="empty-cell">No applications found.</td></tr>`;
        } else {
          applicationsTableBody.innerHTML = data.applications
            .map(
              (app) => `
                <tr>
                  <td>
                    <strong>${AdminPanel.escapeHtml(app.full_name)}</strong><br>
                    <span style="color:#64748b;font-size:13px;">${AdminPanel.escapeHtml(app.email)}</span>
                  </td>
                  <td>${AdminPanel.escapeHtml(app.job_title)}</td>
                  <td>${AdminPanel.escapeHtml(app.experience || "—")}</td>
                  <td>${AdminPanel.formatDate(app.created_at)}</td>
                  <td>
                    <select class="status-select js-status-change" data-id="${app.id}">
                      ${statusOptions
                        .map(
                          (status) =>
                            `<option value="${status}" ${app.status === status ? "selected" : ""}>${status}</option>`
                        )
                        .join("")}
                    </select>
                  </td>
                  <td>
                    <button type="button" class="btn btn-outline js-view-application" data-id="${app.id}">
                      <i class="fa-solid fa-eye"></i> View
                    </button>
                  </td>
                </tr>
              `
            )
            .join("");
        }

        AdminPanel.renderPagination(applicationsPagination, data.pagination, loadApplications);
      } 
      catch (error) {

    console.error(error);

    applicationsTableBody.innerHTML =
    `<tr><td colspan="6" class="empty-cell">${error.message}</td></tr>`;

    AdminPanel.showToast(error.message,"error");
}
      // catch (error) {
      //   applicationsTableBody.innerHTML =
      //     `<tr><td colspan="6" class="empty-cell">Failed to load applications.</td></tr>`;
      //   AdminPanel.showToast(error.message || "Failed to load applications.", "error");
      // } 
      finally {
        AdminPanel.showSpinner(false);
      }
    };

    applicationsRowsPerPage?.addEventListener("change",()=>{
      rowsPerPage=parseInt(applicationsRowsPerPage.value);
      loadApplications(1);
    });

    const updateStatus = async (id, status) => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", status);

      try {
        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/update-status.php`, {
          method: "POST",
          body: formData,
        });

        if (!data.success) throw new Error(data.message || "Status update failed.");
        AdminPanel.showToast(data.message || "Status updated.");
      } catch (error) {
        AdminPanel.showToast(error.message || "Status update failed.", "error");
        loadApplications(currentPage);
      }
    };

    const viewApplication = async (id) => {
      try {
        AdminPanel.showSpinner(true);
        const data = await AdminPanel.fetchJson(`${AdminPanel.AJAX_BASE}/get-application.php?id=${id}`);

        if (!data.success) throw new Error(data.message || "Application not found.");

        const app = data.application;
        const initials = app.full_name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        AdminPanel.openDrawer({
          title: app.full_name,
          subtitle: app.job_title,
          bodyHtml: `
            <div class="app-profile">
              <div class="app-profile-avatar">${AdminPanel.escapeHtml(initials)}</div>
              <div>
                <strong>${AdminPanel.escapeHtml(app.full_name)}</strong>
                <p style="margin:4px 0 0;color:#64748b;">${AdminPanel.escapeHtml(app.experience || "—")} experience</p>
              </div>
            </div>
            <div class="app-detail-grid">
              <div class="app-detail-row"><span>Email</span><strong>${AdminPanel.escapeHtml(app.email)}</strong></div>
              <div class="app-detail-row"><span>Phone</span><strong>${AdminPanel.escapeHtml(app.phone)}</strong></div>
              <div class="app-detail-row"><span>Applied</span><strong>${AdminPanel.formatDate(app.created_at)}</strong></div>
              <div class="app-detail-row"><span>Job Position</span><strong>${AdminPanel.escapeHtml(app.job_title)}</strong></div>
              <div class="app-detail-row"><span>Current Company</span><strong>${AdminPanel.escapeHtml(app.current_company || "—")}</strong></div>
              <div class="app-detail-row"><span>Status</span><strong>${AdminPanel.statusBadge(app.status)}</strong></div>
            </div>
            ${app.job_description ? `<div class="app-detail-block"><h3>Job Description</h3><p>${AdminPanel.escapeHtml(app.job_description).replace(/\n/g, "<br>")}</p></div>` : ""}
            ${app.cover_letter ? `<div class="app-detail-block"><h3>Cover Letter</h3><p>${AdminPanel.escapeHtml(app.cover_letter).replace(/\n/g, "<br>")}</p></div>` : ""}
          `,
          // <a href="/laresits/${AdminPanel.escapeHtml(app.resume)}"
          footerHtml: app.resume
            ? `<a href="${AdminPanel.escapeHtml(app.resume.startsWith('/') ? app.resume : '/' + app.resume)}" class="btn btn-primary" target="_blank" rel="noopener"><i class="fa-solid fa-download"></i> Download Resume</a>
               <button type="button" class="btn btn-outline" onclick="AdminPanel.closeDrawer()">Close</button>`
            : `<button type="button" class="btn btn-outline" onclick="AdminPanel.closeDrawer()">Close</button>`,
        });
      } catch (error) {
        AdminPanel.showToast(error.message || "Unable to load application.", "error");
      } finally {
        AdminPanel.showSpinner(false);
      }
    };

    document.getElementById("refreshApplicationsBtn")?.addEventListener("click", () => {
      loadApplications(currentPage);
    });

    applicationsSearch?.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => loadApplications(1), 350);
    });

    applicationsTableBody?.addEventListener("change", (event) => {
      const select = event.target.closest(".js-status-change");
      if (select) updateStatus(select.dataset.id, select.value);
    });

    applicationsTableBody?.addEventListener("click", (event) => {
      const viewBtn = event.target.closest(".js-view-application");
      if (viewBtn) viewApplication(viewBtn.dataset.id);
    });

    loadApplications();
  });
})();
