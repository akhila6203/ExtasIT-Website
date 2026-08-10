// const APP_BASE = window.location.pathname.startsWith('/ExtasIT/') ? '/ExtasIT' : '';
// const APP_BASE = '/ExtasIT';
// const appUrl = (path) => `${APP_BASE}${path.startsWith('/') ? path : `/${path}`}`;
const APP_BASE = '';

const appUrl = (path) =>
  `${APP_BASE}${path.startsWith('/') ? path : `/${path}`}`;



const icons = {
  briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 12h18M10 12v2h4v-2"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></svg>',
  payroll: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h4M7 16h3M15 12h2M14 16h3"/></svg>',
  learning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 10 10-5 10 5-10 5L2 10Z"/><path d="M6 12v5c3 2.2 9 2.2 12 0v-5M22 10v6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>'
};


const companyDetails = {
  address: "Sai paradise, pragathi nagar, Hyderabad 500090",
  email: "extasit01@gmail.com",
  phone: "9441616455",
  phoneLink: "9441616455",
  whatsapp: "9441616455",
};



const dropdownChevron = '<svg class="dropdown-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';

function headerMarkup() {
  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header">
      <nav class="navbar container" aria-label="Primary navigation">
        <a class="brand brand-header" href="index.html" aria-label="ExtasIT home">
<img class="brand-logo-image" src="./assets/logo.png" alt="ExtasIT">
</a>
        <ul class="nav-links" id="primary-menu">
          <li><a class="nav-link" data-page="home" href="index.html">Home</a></li>
          <li class="nav-item has-dropdown">
            <a class="nav-link nav-parent-link" data-page="about" href="about.html">About</a>
            <button class="dropdown-toggle nav-dropdown-button" type="button" aria-label="Open About menu" aria-expanded="false" aria-controls="about-menu">${dropdownChevron}</button>
            <div class="dropdown-menu" id="about-menu">
              <a href="company-overview.html"><strong>Company Overview</strong><small>Our portfolio, markets, and approach</small></a>
              <a href="company-history.html"><strong>Our History</strong><small>Our journey since 2014</small></a>
              <a href="contact.html"><strong>Contact</strong><small>Connect with our team</small></a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a class="nav-link nav-parent-link" data-page="services" href="services.html">Services</a>
            <button class="dropdown-toggle nav-dropdown-button" type="button" aria-label="Open Services menu" aria-expanded="false" aria-controls="services-menu">${dropdownChevron}</button>
            <div class="dropdown-menu dropdown-wide" id="services-menu">
              <a href="it-services.html"><strong>IT Services</strong><small>Web, mobile, and business applications</small></a>
              <a href="web-design-development.html"><strong>Web & Application Development</strong><small>Responsive, effective digital experiences</small></a>
              <a href="training.html"><strong>Training</strong><small>Technical, corporate, and career learning</small></a>
              <a href="recruitment-services.html"><strong>Recruitment Services</strong><small>Permanent, contract, RPO, and search</small></a>
              <a href="payroll-management.html"><strong>Payroll Management</strong><small>Accurate payroll and compliance support</small></a>
              <a href="hr-solutions.html"><strong>End-to-End HR Solutions</strong><small>Complete employee lifecycle support</small></a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a class="nav-link nav-parent-link" data-page="training" href="training.html">Training</a>
            <button class="dropdown-toggle nav-dropdown-button" type="button" aria-label="Open Training menu" aria-expanded="false" aria-controls="training-menu">${dropdownChevron}</button>
            <div class="dropdown-menu dropdown-mega" id="training-menu">
              <a href="cyber-security-training.html"><strong>Cyber Security</strong><small>Security skills and awareness</small></a>
              <a href="full-stack-training.html"><strong>Full Stack</strong><small>End-to-end web development</small></a>
              <a href="sap-training.html"><strong>SAP</strong><small>Enterprise process learning</small></a>
              <a href="dotnet-training.html"><strong>.NET</strong><small>Microsoft application development</small></a>
              <a href="digital-marketing-training.html"><strong>Digital Marketing</strong><small>Channels, content, and campaigns</small></a>
              <a href="ui-ux-training.html"><strong>UI/UX Design</strong><small>User-centred product design</small></a>
              <a href="python-ai-training.html"><strong>Python & AI</strong><small>Programming, data, and AI foundations</small></a>
              <a href="devops-training.html"><strong>DevOps</strong><small>CI/CD and delivery practices</small></a>
              <a href="hr-training.html"><strong>HR Training</strong><small>Recruitment and talent acquisition</small></a>
              <a href="seo-training.html"><strong>SEO</strong><small>Search visibility and digital growth</small></a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a class="nav-link nav-parent-link" data-page="careers" href="careers.html">Careers</a>
            <button class="dropdown-toggle nav-dropdown-button" type="button" aria-label="Open Careers menu" aria-expanded="false" aria-controls="careers-menu">${dropdownChevron}</button>
            <div class="dropdown-menu dropdown-right" id="careers-menu">
              <a href="find-job.html"><strong>Find Your Job</strong><small>Browse opportunity areas</small></a>
            </div>
          </li>
          <li class="nav-register-item has-register">
            <button class="nav-link nav-action register-toggle" type="button" aria-expanded="false" aria-controls="register-menu">
              <span>Register</span>${dropdownChevron}
            </button>
            <div class="register-menu" id="register-menu">
              <button type="button" data-register-type="Student"><strong>Students</strong><small>Register for training & opportunities</small></button>
              <button type="button" data-register-type="Instructor"><strong>Instructors</strong><small>Join as a trainer or instructor</small></button>
              <button type="button" data-register-type="Hire From Us"><strong>Hire From Us</strong><small>Tell us about your hiring requirement</small></button>
            </div>
          </li>
          <li class="nav-upload-item"><a class="nav-link nav-action" data-page="careers" href="upload-cv.html">Upload CV <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3m0 0L6.5 6.5M10 3l3.5 3.5M4 12.5v3A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5v-3"/></svg></a></li>
          <li class="nav-login-item"><button class="nav-link nav-action nav-login-button" type="button" data-login-open><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6"/></svg><span>Login</span></button></li>
        </ul>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span></span></button>
      </nav>
    </header>`;
}

function registerPopupMarkup() {
  return `
    <div class="register-popover" data-register-popover hidden>
      <aside class="register-popover-panel" role="dialog" aria-modal="true" aria-labelledby="register-popover-title">
        <div class="register-popover-head">
          <div><span class="eyebrow">Register</span><h3 id="register-popover-title" data-register-title>Student Registration</h3></div>
          <button class="admin-login-close" type="button" data-register-close aria-label="Close register panel">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>
          </button>
        </div>
        <form data-register-form>
          <input type="hidden" name="inquiry_type" value="Student">
          <div class="register-form-grid">
            <div class="field"><label>Full name *</label><input name="name" required></div>
            <div class="field"><label>Email *</label><input name="email" type="email" required></div>
            <div class="field"><label>Phone</label><input name="phone" type="tel"></div>
            <div class="field"><label>Company / College</label><input name="company"></div>
            <div class="field full" data-register-service-wrap><label data-register-service-label>Course / Area</label><input name="service"></div>
            <div class="field full"><label>Message *</label><textarea name="message" rows="4" required></textarea></div>
          </div>
          <button class="btn btn-primary" type="submit">Submit <span aria-hidden="true">→</span></button>
          <div class="form-status" data-register-status role="status" aria-live="polite"></div>
        </form>
      </aside>
    </div>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html" aria-label="ExtasIT home"><img class="brand-logo-image" src="assets/extasit-logo.png" alt="ExtasIT"></a>
          <p>Integrated IT, recruitment, HR, payroll, and training solutions designed around your business goals.</p>
          <a class="btn btn-primary footer-talent-link" href="contact.html">Join Our Talent Network</a>
        </div>
        <div>
          <div class="footer-title">Company</div>
          <ul class="footer-links">
            <li><a href="company-overview.html">Company overview</a></li>
            <li><a href="company-history.html">Our history</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="admin/login.php">Admin login</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-title">Core services</div>
          <ul class="footer-links">
            <li><a href="it-services.html">IT Services</a></li>
            <li><a href="web-design-development.html">Web & Application Development</a></li>
            <li><a href="training.html">Training</a></li>
            <li><a href="recruitment-services.html">Recruitment Services</a></li>
            <li><a href="payroll-management.html">Payroll Management</a></li>
            <li><a href="hr-solutions.html">End-to-End HR Solutions</a></li>
          </ul>
        </div>

<div class="footer-column">
  <h3>Contact Us</h3>

  <div class="footer-contact-item">
    <span class="footer-contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"></path>
        <circle cx="12" cy="9" r="2.5"></circle>
      </svg>
    </span>
    <span>${companyDetails.address}</span>
  </div>

  <div class="footer-contact-item">
    <span class="footer-contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m3 7 9 6 9-6"></path>
      </svg>
    </span>
    <a href="mailto:${companyDetails.email}">
      ${companyDetails.email}
    </a>
  </div>

  <div class="footer-contact-item">
    <span class="footer-contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"></path>
      </svg>
    </span>
    <a href="tel:${companyDetails.phoneLink}">
      ${companyDetails.phone}
    </a>
  </div>
</div>


      </div>
      <div class="container footer-bottom">
        <span>© <span data-current-year></span> ExtasIT. All rights reserved.</span>
        <span>Serving organizations across India and Europe</span>
      </div>
    </footer>`;
}

function adminLoginPanelMarkup() {
  return `
    <div class="admin-login-overlay" id="admin-login-overlay" aria-hidden="true">
      <aside class="admin-login-panel" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
        <div class="admin-login-top">
          <span class="admin-login-brand"><img src="assets/extasit-logo.png" alt="ExtasIT"></span>
          <button class="admin-login-close" type="button" data-login-close aria-label="Close login panel">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>
          </button>
        </div>
        <span class="eyebrow">Secure administrator access</span>
        <h2 id="admin-login-title">Admin Login</h2>
        <p>Sign in to access the ExtasIT administration workspace.</p>
        <form class="admin-login-form" data-admin-login-form>
          <div class="field"><label for="admin-login-username">Username</label><input id="admin-login-username" name="username" autocomplete="username" maxlength="120" required></div>
          <div class="field"><label for="admin-login-password">Password</label><div class="password-control"><input id="admin-login-password" name="password" type="password" autocomplete="current-password" maxlength="300" required><button type="button" data-password-toggle aria-label="Show password">Show</button></div></div>
          <button class="btn btn-primary admin-login-submit" type="submit">Sign In</button>
          <div class="form-status" data-login-message role="status" aria-live="polite"></div>
        </form>
        <p class="admin-login-help">Authorized administrators only. Contact the website owner if you need access.</p>
      </aside>
    </div>`;
}

document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', headerMarkup());
document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', footerMarkup());
document.body.insertAdjacentHTML('beforeend', registerPopupMarkup());
if (document.body.dataset.page !== 'admin') document.body.insertAdjacentHTML('beforeend', adminLoginPanelMarkup());

document.querySelectorAll('[data-icon]').forEach((element) => {
  const icon = icons[element.dataset.icon];
  if (icon) element.innerHTML = icon;
});

const page = document.body.dataset.page;
const pageGroup = page?.startsWith('service-') ? 'services'
  : page?.startsWith('training-') ? 'training'
  : page?.startsWith('career-') ? 'careers'
  : page?.startsWith('about-') ? 'about'
  : page;
document.querySelector(`.nav-link[data-page="${pageGroup}"]`)?.setAttribute('aria-current', 'page');
document.querySelectorAll('[data-current-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = [...document.querySelectorAll('.dropdown-toggle')];

function closeDropdowns(except = null) {
  dropdownToggles.forEach((toggle) => {
    if (toggle === except) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.closest('.has-dropdown')?.classList.remove('dropdown-open');
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    closeDropdowns(toggle);
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.closest('.has-dropdown')?.classList.toggle('dropdown-open', willOpen);
  });
  toggle.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.closest('.has-dropdown')?.classList.remove('dropdown-open');
      toggle.focus();
    }
  });
});

document.addEventListener('click', () => closeDropdowns());

function closeMenu() {
  if (!menuButton || !navLinks) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  closeDropdowns();
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks?.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1160) closeMenu();
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((item) => {
  if (revealObserver) revealObserver.observe(item);
  else item.classList.add('visible');
});

document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(willOpen));
    panel?.classList.toggle('open', willOpen);
  });
});

const serviceNavLinks = document.querySelectorAll('.service-nav a');
const detailCards = document.querySelectorAll('.detail-card[id]');
if (serviceNavLinks.length && detailCards.length && 'IntersectionObserver' in window) {
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      serviceNavLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  detailCards.forEach((card) => serviceObserver.observe(card));
}

const jobCards = [...document.querySelectorAll('.job-card[data-category]')];
document.querySelectorAll('.filter-btn[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    jobCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });
    const empty = document.querySelector('.empty-jobs');
    if (empty) empty.hidden = visibleCount > 0;
  });
});

const uploadArea = document.querySelector('.upload-area');
const fileInput = document.getElementById('cv-file');
const fileName = document.querySelector('.file-name');

function setFile(file) {
  if (!file || !fileName) return false;
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type)) {
    fileName.textContent = 'Please choose a PDF, DOC, or DOCX file.';
    fileName.style.color = '#c63838';
    return false;
  }
  if (file.size > 4 * 1024 * 1024) {
    fileName.textContent = 'The file must be smaller than 4 MB.';
    fileName.style.color = '#c63838';
    return false;
  }
  fileName.textContent = `Selected: ${file.name}`;
  fileName.style.color = '';
  return true;
}

fileInput?.addEventListener('change', () => setFile(fileInput.files[0]));
['dragenter', 'dragover'].forEach((eventName) => uploadArea?.addEventListener(eventName, (event) => {
  event.preventDefault();
  uploadArea.classList.add('dragover');
}));
['dragleave', 'drop'].forEach((eventName) => uploadArea?.addEventListener(eventName, (event) => {
  event.preventDefault();
  uploadArea.classList.remove('dragover');
}));
uploadArea?.addEventListener('drop', (event) => {
  const droppedFile = event.dataTransfer.files[0];
  if (fileInput && droppedFile && setFile(droppedFile)) {
    const transfer = new DataTransfer();
    transfer.items.add(droppedFile);
    fileInput.files = transfer.files;
  }
});

const cvForm = document.querySelector('form[data-cv-form]');
const requestedJobId = new URLSearchParams(window.location.search).get('job') || new URLSearchParams(window.location.search).get('job_id');
if (cvForm && requestedJobId) {
  fetch(appUrl('/api/jobs.php'), { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((result) => {
      const selectedJob = result.jobs?.find((job) => String(job.id) === String(requestedJobId) || String(job.job_id) === String(requestedJobId));
      if (!selectedJob) return;
      if (cvForm.elements.jobId) cvForm.elements.jobId.value = selectedJob.id;
      if (cvForm.elements.job_id) cvForm.elements.job_id.value = selectedJob.id;
      const note = cvForm.querySelector('[data-selected-job]');
      if (note) {
        note.textContent = `Applying for ${selectedJob.title} · ${selectedJob.location}`;
        note.hidden = false;
      }
    })
    .catch(() => {});
}
cvForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const status = cvForm.querySelector('.form-status');
  const submitButton = cvForm.querySelector('button[type="submit"]');
  const selectedFile = fileInput?.files?.[0];

  status?.classList.remove('show', 'success', 'error');

  if (!cvForm.checkValidity()) {
    cvForm.reportValidity();
    return;
  }

  if (!setFile(selectedFile)) return;

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting…';
  }

  if (status) {
    status.textContent = 'Uploading your CV securely…';
    status.classList.add('show');
  }

  try {
    const submission = await fetch(cvForm.action, {
      method: 'POST',
      body: new FormData(cvForm),
      headers: { Accept: 'application/json' }
    });
    const result = await submission.json().catch(() => ({}));

    if (!submission.ok || !result.success) {
      throw new Error(result.message || 'Your application could not be submitted. Please try again.');
    }

    if (status) {
      status.textContent = result.message;
      status.classList.add('success');
    }
    cvForm.reset();
    if (fileName) fileName.textContent = '';
  } catch (error) {
    if (status) {
      status.textContent = error.message || 'Your application could not be submitted. Please try again.';
      status.classList.add('error');
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit application';
    }
  }
});

document.querySelectorAll('[data-password-toggle]').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const passwordInput = toggle.closest('.password-control')?.querySelector('input');
    if (!passwordInput) return;
    const showPassword = passwordInput.type === 'password';
    passwordInput.type = showPassword ? 'text' : 'password';
    toggle.textContent = showPassword ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', `${showPassword ? 'Hide' : 'Show'} password`);
  });
});

const adminLoginOverlay = document.getElementById('admin-login-overlay');
const adminLoginForms = document.querySelectorAll('form[data-login-form], form[data-admin-login-form]');

function openAdminLogin() {
  closeMenu();
  closeRegisterPopover();
  adminLoginOverlay?.classList.add('active');
  adminLoginOverlay?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
  window.setTimeout(() => adminLoginOverlay?.querySelector('input[name="username"]')?.focus(), 180);
}

function closeAdminLogin() {
  adminLoginOverlay?.classList.remove('active');
  adminLoginOverlay?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  adminLoginOverlay?.querySelector('form')?.reset();
  const message = adminLoginOverlay?.querySelector('[data-login-message]');
  message?.classList.remove('show', 'success', 'error');
  if (message) message.textContent = '';
}

document.querySelectorAll('[data-login-open]').forEach((button) => {
  button.addEventListener('click', () => {
    openAdminLogin();
  });
});
document.querySelectorAll('[data-login-close]').forEach((button) => button.addEventListener('click', closeAdminLogin));
adminLoginOverlay?.addEventListener('click', (event) => {
  if (event.target === adminLoginOverlay) closeAdminLogin();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && adminLoginOverlay?.classList.contains('active')) closeAdminLogin();
});

async function submitAdminLogin(form) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const status = form.querySelector('.form-status, [data-login-message]');
  const submitButton = form.querySelector('button[type="submit"]');
  const defaultLabel = submitButton?.textContent || 'Sign In';
  status?.classList.remove('show', 'success', 'error');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in…';
  }

  try {
    const response = await fetch(appUrl('/ajax/login.php'), {
      method: 'POST',
      body: new FormData(form),
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.message || 'Login failed.');

    if (status) {
      status.textContent = result.message || 'Login successful.';
      status.classList.add('show', 'success');
    }
    window.location.href = result.redirect || appUrl('/admin/dashboard.php');
  } catch (error) {
    if (status) {
      status.textContent = error.message || 'Unable to connect. Please try again.';
      status.classList.add('show', 'error');
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = defaultLabel;
    }
  }
}

adminLoginForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAdminLogin(form);
  });
});

async function updateLoginState() {
  try {
    await fetch(appUrl('/ajax/check-login.php'), { credentials: 'same-origin', headers: { Accept: 'application/json' } });
  } catch {
    // Intentionally ignored; the public header login stays as Login.
  }
}

const adminDashboard = document.querySelector('[data-admin-dashboard]');
if (adminDashboard) {
  fetch(appUrl('/ajax/check-login.php'), { credentials: 'same-origin', headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((result) => {
      if (!result.logged_in) {
        window.location.replace(appUrl('/'));
        return;
      }
      document.querySelectorAll('[data-admin-username]').forEach((element) => {
        element.textContent = result.admin?.username || 'Administrator';
      });
      window.extasitAdminProfile = result.admin || {};
      adminDashboard.hidden = false;
      window.dispatchEvent(new CustomEvent('extasit:admin-ready', { detail: window.extasitAdminProfile }));
    })
    .catch(() => window.location.replace(appUrl('/')));
}

document.querySelectorAll('[data-admin-logout]').forEach((button) => button.addEventListener('click', async () => {
  try {
    await fetch(appUrl('/admin/logout.php'), { method: 'GET', credentials: 'same-origin', headers: { Accept: 'application/json' } });
  } finally {
    window.location.replace(appUrl('/index.html'));
  }
}));

updateLoginState();

const registerToggle = document.querySelector('.register-toggle');
const registerMenu = document.getElementById('register-menu');
const registerPopover = document.querySelector('[data-register-popover]');
const registerForm = document.querySelector('[data-register-form]');
const registerTitle = document.querySelector('[data-register-title]');
const registerTypeInput = registerForm?.querySelector('[name="inquiry_type"]');
const registerStatus = document.querySelector('[data-register-status]');

function closeRegisterMenu() {
  registerToggle?.setAttribute('aria-expanded', 'false');
  registerToggle?.closest('.has-register')?.classList.remove('register-open');
}

function closeRegisterPopover() {
  registerPopover?.classList.remove('show');
  setTimeout(() => { if (registerPopover) registerPopover.hidden = true; }, 180);
}

registerToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  closeAdminLogin();
  const open = registerToggle.getAttribute('aria-expanded') !== 'true';
  closeDropdowns();
  registerToggle.setAttribute('aria-expanded', String(open));
  registerToggle.closest('.has-register')?.classList.toggle('register-open', open);
});
document.querySelectorAll('[data-register-type]').forEach((button) => {
  button.addEventListener('click', () => {
    closeAdminLogin();
    const type = button.dataset.registerType || 'Student';
    registerTypeInput.value = type;
    registerTitle.textContent = type === 'Hire From Us' ? 'Hire From Us' : `${type} Registration`;
    const serviceLabel = document.querySelector('[data-register-service-label]');
    const serviceInput = registerForm?.querySelector('[name="service"]');
    if (serviceLabel) serviceLabel.textContent = type === 'Hire From Us' ? 'Hiring requirement' : type === 'Instructor' ? 'Subject / Expertise' : 'Course / Area';
    if (serviceInput) serviceInput.placeholder = type === 'Hire From Us' ? 'e.g. React developers, HR executives' : '';
    registerPopover.hidden = false;
    requestAnimationFrame(() => registerPopover.classList.add('show'));
    closeRegisterMenu();
    registerForm?.querySelector('[name="name"]')?.focus();
  });
});
document.querySelector('[data-register-close]')?.addEventListener('click', () => {
  closeRegisterPopover();
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.has-register') && !event.target.closest('[data-register-popover]')) {
    closeRegisterMenu();
  }
});
registerForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  registerStatus?.classList.remove('show','success','error');
  const submit = registerForm.querySelector('button[type="submit"]');
  submit.disabled = true; submit.textContent = 'Submitting…';
  try {
    const response = await fetch(appUrl('/api/submit-inquiry.php'), { method:'POST', body:new FormData(registerForm), headers:{Accept:'application/json'} });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Unable to submit form.');
    if (registerStatus) { registerStatus.textContent=result.message; registerStatus.classList.add('show','success'); }
    registerForm.reset();
    registerTypeInput.value='Student';
  } catch (error) {
    if (registerStatus) { registerStatus.textContent=error.message || 'Please try again.'; registerStatus.classList.add('show','error'); }
  } finally {
    submit.disabled=false; submit.innerHTML='Submit <span aria-hidden="true">→</span>';
  }
});

document.querySelectorAll('form[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status?.classList.remove('show','success','error');
    const old = button?.textContent; if (button) { button.disabled=true; button.textContent='Sending…'; }
    try {
      const response = await fetch(form.action, {method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send enquiry.');
      if (status) { status.textContent=result.message; status.classList.add('show','success'); }
      form.reset();
    } catch (error) {
      if (status) { status.textContent=error.message || 'Please try again.'; status.classList.add('show','error'); }
    } finally { if (button) { button.disabled=false; button.textContent=old || 'Send enquiry'; } }
  });
});

document.querySelectorAll('form[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((input) => {
      const field = input.closest('.field');
      const error = field?.querySelector('.field-error');
      input.removeAttribute('aria-invalid');
      if (!input.value.trim()) {
        valid = false;
        input.setAttribute('aria-invalid', 'true');
        if (error) error.textContent = 'This field is required.';
      } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        valid = false;
        input.setAttribute('aria-invalid', 'true');
        if (error) error.textContent = 'Enter a valid email address.';
      } else if (error) {
        error.textContent = '';
      }
    });

    const status = form.querySelector('.form-status');
    if (valid && status) {
      status.textContent = 'The form is ready. Connect it to your preferred email or form service before publishing.';
      status.classList.add('show');
      status.setAttribute('role', 'status');
    }
  });
});
