(() => {
  "use strict";

  const APP_BASE = window.location.pathname.startsWith('/ExtasIT/') ? '/ExtasIT' : '';
  const AJAX_BASE = `${APP_BASE}/ajax`;

  window.AdminPanel = {
    AJAX_BASE,

    escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    },

    formatDate(value) {
      if (!value) return "—";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    // formatSalary(min, max) {
    //   const fmt = (val) => {
    //     if (val === null || val === undefined || val === "") return null;
    //     const num = Number(val);
    //     if (Number.isNaN(num)) return null;
    //     return `$${num.toLocaleString()}`;
    //   };
    //   const minVal = fmt(min);
    //   const maxVal = fmt(max);
    //   if (minVal && maxVal) return `${minVal} - ${maxVal}`;
    //   if (minVal) return `${minVal}+`;
    //   if (maxVal) return `Up to ${maxVal}`;
    //   return "—";
    // },
    formatSalary(min, max) {
  const fmt = (val) => {
    if (val === null || val === undefined || val === "") {
      return null;
    }

    const value = String(val).trim();

    if (value === "") {
      return null;
    }

    return `$${value}`;
  };

  const minVal = fmt(min);
  const maxVal = fmt(max);

  if (minVal && maxVal) {
    return `${minVal} - ${maxVal}`;
  }

  if (minVal) {
    return `${minVal}+`;
  }

  if (maxVal) {
    return `Up to ${maxVal}`;
  }

  return "—";
},

    showSpinner(show = true) {
      const spinner = document.getElementById("globalSpinner");
      if (spinner) spinner.hidden = !show;
    },

    showToast(message, type = "success") {
      const container = document.getElementById("toastContainer");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = `panel-toast ${type}`;
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => toast.remove(), 3200);
    },

    // async fetchJson(url, options = {}) {
    //   const response = await fetch(url, options);

    //   if (response.status === 401) {
    //     window.location.href = "/index.html";
    //     // window.location.href = "/laresits/index.html";
    //     throw new Error("Unauthorized");
    //   }

    //   return response.json();
    // },
    async fetchJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
  });

  if (response.status === 401) {
    window.location.href = `${APP_BASE}/index.html`;
    throw new Error("Unauthorized");
  }

  return response.json();
},

    openDrawer({ title, subtitle = "", bodyHtml = "", footerHtml = "" }) {
      const overlay = document.getElementById("panelOverlay");
      const drawer = document.getElementById("panelDrawer");
      const drawerTitle = document.getElementById("panelDrawerTitle");
      const drawerSubtitle = document.getElementById("panelDrawerSubtitle");
      const drawerBody = document.getElementById("panelDrawerBody");
      const drawerFooter = document.getElementById("panelDrawerFooter");

      drawerTitle.textContent = title;
      drawerSubtitle.textContent = subtitle;
      drawerBody.innerHTML = bodyHtml;
      drawerFooter.innerHTML = footerHtml;

      overlay?.classList.add("active");
      drawer?.classList.add("open");
      document.body.style.overflow = "hidden";
    },

    closeDrawer() {
      document.getElementById("panelOverlay")?.classList.remove("active");
      document.getElementById("panelDrawer")?.classList.remove("open");
      document.body.style.overflow = "";
    },

    statusBadge(status) {
      const key = String(status || "").toLowerCase().replace(/\s+/g, "-");
      return `<span class="status-badge ${AdminPanel.escapeHtml(key)}">${AdminPanel.escapeHtml(status)}</span>`;
    },

    renderPagination(container, pagination, onPageChange) {
      if (!container || !pagination) return;

      const { page, pages } = pagination;
      if (pages <= 1) {
        container.innerHTML = "";
        return;
      }

      let html = `<button type="button" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;

      for (let i = 1; i <= pages; i += 1) {
        if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
          html += `<button type="button" data-page="${i}" class="${i === page ? "active" : ""}">${i}</button>`;
        } else if (Math.abs(i - page) === 2) {
          html += `<span>...</span>`;
        }
      }

      html += `<button type="button" data-page="${page + 1}" ${page >= pages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;
      container.innerHTML = html;

      container.querySelectorAll("button[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const nextPage = Number(btn.dataset.page);
          if (!Number.isNaN(nextPage)) onPageChange(nextPage);
        });
      });
    },

    confirmAction(message) {
      return window.confirm(message);
    },

    initLayout() {
      const sidebar = document.getElementById("adminSidebar");
      const toggle = document.getElementById("sidebarToggle");
      const profileDropdown = document.getElementById("adminProfileDropdown");
      const profileBtn = document.getElementById("adminProfileBtn");
      const drawerClose = document.getElementById("panelDrawerClose");
      const overlay = document.getElementById("panelOverlay");

      toggle?.addEventListener("click", () => sidebar?.classList.toggle("open"));

      profileBtn?.addEventListener("click", () => {
        profileDropdown?.classList.toggle("open");
      });

      document.addEventListener("click", (event) => {
        if (!profileDropdown?.contains(event.target)) {
          profileDropdown?.classList.remove("open");
        }
      });

      drawerClose?.addEventListener("click", () => AdminPanel.closeDrawer());
      overlay?.addEventListener("click", () => AdminPanel.closeDrawer());

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          AdminPanel.closeDrawer();
          sidebar?.classList.remove("open");
        }
      });

      document.querySelectorAll("[data-close-modal]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const modal = btn.closest(".panel-modal");
          if (modal) modal.hidden = true;
        });
      });
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    AdminPanel.initLayout();
  });
})();
