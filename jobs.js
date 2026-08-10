const jobsContainer = document.querySelector('[data-public-jobs]');

if (jobsContainer) {
  const state = { jobs: [], filter: 'All' };
  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const lines = (value) => String(value || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const shortText = (value, limit = 160) => {
    const text = String(value ?? '').trim();
    if (text.length <= limit) return text;
    return `${text.slice(0, limit).trim()}...`;
  };
  const formatDate = (value) => {
    if (!value) return 'Recently';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  function salary(job) {
    if (job.salaryMin == null && job.salaryMax == null) return 'Salary discussed during selection';
    const format = (value) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
    if (job.salaryMin != null && job.salaryMax != null) return `₹${format(job.salaryMin)} – ₹${format(job.salaryMax)}`;
    return job.salaryMin != null ? `From ₹${format(job.salaryMin)}` : `Up to ₹${format(job.salaryMax)}`;
  }

  function render() {
    const jobs = state.jobs.filter((job) => state.filter === 'All' || job.category === state.filter);
    const empty = document.querySelector('[data-public-jobs-empty]');
    empty.hidden = jobs.length > 0;
    jobsContainer.innerHTML = jobs.map((job) => `
      <article class="public-job-card">
        <div class="public-job-top">
          <span class="public-job-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"/></svg></span>
          <span class="public-job-type">${escapeHtml(job.jobType || job.category || 'Full Time')}</span>
        </div>
        <p class="public-job-ref">${escapeHtml(job.jobCode || job.job_id || '-')} • ${escapeHtml(job.company || 'ExtasIT')}</p>
        <h3>${escapeHtml(job.title)}</h3>
        <p class="public-job-summary">${escapeHtml(shortText(job.description, 170))}</p>
        <div class="public-job-meta">
  <span>
    <i class="fa-solid fa-location-dot"></i>
    ${escapeHtml(job.location || 'Location not specified')}
  </span>

  <span>
    <i class="fa-solid fa-user"></i>
    ${escapeHtml(job.experience || 'Experience based on role')}
  </span>

  <span>
    <i class="fa-solid fa-indian-rupee-sign"></i>
    ${escapeHtml(salary(job))}
  </span>

  <span>
    <i class="fa-regular fa-calendar"></i>
    Posted: ${escapeHtml(formatDate(job.created_at || job.postedAt))}
  </span>
</div>
        <div class="public-job-actions">
          <button class="btn btn-secondary" type="button" data-view-job="${escapeHtml(job.id)}">View Details <span aria-hidden="true">→</span></button>
          <button class="btn btn-primary" type="button" data-apply-job="${escapeHtml(job.id)}">Apply Now</button>
        </div>
      </article>`).join('');
  }

  document.querySelectorAll('[data-dynamic-job-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-dynamic-job-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    state.filter = button.dataset.dynamicJobFilter;
    render();
  }));

  const modal = document.querySelector('[data-job-details-modal]');
  function closeModal() {
    modal.classList.remove('active');
    window.setTimeout(() => { modal.hidden = true; }, 220);
  }
  document.querySelectorAll('[data-close-job-details]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
  document.addEventListener('click', (event) => {
    const applyTrigger = event.target.closest('[data-apply-job]');
    if (applyTrigger) { openApplyModal(applyTrigger.dataset.applyJob); return; }
    const trigger = event.target.closest('[data-view-job]');
    if (!trigger) return;
    const job = state.jobs.find((item) => item.id === trigger.dataset.viewJob);
    if (!job) return;
    const section = (title, content) => content.length ? `<section><h3>${title}</h3><ul>${content.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>` : '';
    document.querySelector('[data-job-details-content]').innerHTML = `
      <div class="job-detail-header-meta">
        <span class="public-job-code">${escapeHtml(job.jobCode || job.job_id || 'JOB REF')}</span>
        <h2 id="public-job-title">${escapeHtml(job.title)}</h2>
        <p class="job-details-company">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</p>
      </div>
      <div class="job-details-facts">
        <span>${escapeHtml(job.jobType || 'Full Time')}</span>
        <span>${escapeHtml(job.experience || 'Experience based on role')}</span>
        <span>${escapeHtml(salary(job))}</span>
        <span>${escapeHtml(job.vacancies || 1)} opening(s)</span>
      </div>
      <section><h3>About the role</h3><p>${escapeHtml(job.description || 'No description available for this role yet.')}</p></section>
      <section class="job-detail-grid">
        <div><strong>Company</strong><span>${escapeHtml(job.company || 'ExtasIT')}</span></div>
        <div><strong>Location</strong><span>${escapeHtml(job.location || 'Not specified')}</span></div>
        <div><strong>Experience</strong><span>${escapeHtml(job.experience || 'Not specified')}</span></div>
        <div><strong>Salary</strong><span>${escapeHtml(salary(job))}</span></div>
        <div><strong>Posted</strong><span>${escapeHtml(formatDate(job.created_at || job.postedAt))}</span></div>
        <div><strong>Vacancies</strong><span>${escapeHtml(job.vacancies || 1)}</span></div>
      </section>
      ${section('Responsibilities', lines(job.responsibilities))}
      ${section('Requirements', lines(job.requirements))}
      ${section('Benefits', lines(job.benefits))}`;
    document.querySelector('[data-job-apply]').onclick = () => { closeModal(); openApplyModal(job.id); };
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('active'));
  });


  const applyModal = document.querySelector('[data-job-apply-modal]');
  const applyForm = document.querySelector('[data-job-apply-form]');
  const applyJobId = document.querySelector('[data-apply-job-id]');
  const applyJobIdSecondary = document.querySelector('[data-apply-job-id-secondary]');
  const applySubtitle = document.querySelector('[data-apply-job-subtitle]');
  const applyStatus = document.querySelector('[data-apply-status]');
  function closeApplyModal(){ if(!applyModal) return; applyModal.classList.remove('active'); window.setTimeout(() => { applyModal.hidden = true; }, 220); }
  document.querySelectorAll('[data-close-job-apply]').forEach(b=>b.addEventListener('click',closeApplyModal));
  function openApplyModal(id){
    const job=state.jobs.find(item=>String(item.id)===String(id)); if(!job||!applyModal) return;
    applyForm?.reset();
    applyJobId.value=job.id;
    if (applyJobIdSecondary) applyJobIdSecondary.value = job.id;
    applySubtitle.textContent=`${job.title} · ${job.company} · ${job.location}`;
    applyStatus?.classList.remove('show','success','error'); applyStatus.textContent='';
    applyModal.hidden=false;
    requestAnimationFrame(() => applyModal.classList.add('active'));
    applyForm?.querySelector('[name="name"]')?.focus();
  }
  applyForm?.addEventListener('submit',async(e)=>{
    e.preventDefault(); if(!applyForm.checkValidity()){applyForm.reportValidity();return;}
    const btn=applyForm.querySelector('button[type="submit"]'); const old=btn.textContent;
    applyStatus?.classList.remove('show','success','error'); btn.disabled=true; btn.textContent='Submitting…';
    try{
      const r=await fetch(applyForm.action,{method:'POST',body:new FormData(applyForm),headers:{Accept:'application/json'}});
      const d=await r.json(); if(!r.ok||!d.success) throw new Error(d.message||'Unable to submit application.');
      applyStatus.textContent=d.message; applyStatus.classList.add('show','success'); applyForm.reset();
    }catch(err){applyStatus.textContent=err.message||'Please try again.';applyStatus.classList.add('show','error')}
    finally{btn.disabled=false;btn.textContent=old}
  });
  fetch(window.location.pathname.startsWith('/ExtasIT/') ? '/ExtasIT/api/jobs.php' : 'api/jobs.php', { headers: { Accept: 'application/json' } })
    .then(async (response) => {
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load jobs.');
      state.jobs = result.jobs || [];
      render();
    })
    .catch((error) => {
      jobsContainer.innerHTML = `<div class="jobs-loading jobs-error">${escapeHtml(error.message || 'Job listings are temporarily unavailable.')}</div>`;
    });
}
