# ExtasIT website

A responsive multi-page company website built with plain HTML, CSS, and JavaScript.

## Website structure

- Main pages: Home, About, Services, Training, Careers, Login, and Contact
- About links directly to the About page; its dropdown contains Company Overview and Company History
- Services links directly to the Services page; its dropdown contains IT Services, Payroll Management, End-to-End HR Solutions, Web Design & Development, and Recruitment Services
- Training links directly to the Training page; its dropdown contains Cyber Security, Full Stack, SAP, .NET, Digital Marketing, UI/UX, Python & AI, DevOps, and HR Training
- Careers links directly to the Careers page; its dropdown contains Find Your Job, with a separate Upload CV header button
- Login: Lares-inspired right-side administrator login panel, protected session, direct login page, and full recruitment administration portal
- Administrator portal: Dashboard, Jobs, Applications, and Profile sections
- Dynamic careers: active jobs published in the portal automatically appear on `find-job.html`; inactive, closed, edited, and deleted jobs update there automatically
- Applications: job-linked and general CV submissions appear in the portal, with protected CV downloads and recruitment status management

Every page has a distinct banner design and the same shared footer.
Upload CV appears once in the navigation as the highlighted header action.
The official ExtasIT logo is used consistently in the shared header and footer.
The homepage, core service pages, and every training detail page include optimized, original content-matched imagery. Additional editorial images support the company story, training experience, and careers content without overloading the layout.
The About, Training, Careers, and Upload CV banners use content-matched photography with the ExtasIT logo color palette.

## Preview locally

Open `index.html` directly in a browser for a visual preview. For the optional development preview, run `npm install` once and then `npm run dev`.

The CV form uses the Vercel Function at `api/submit-cv.js`. It validates PDF, DOC, and DOCX files up to 4 MB and stores each CV plus its application record in a private Vercel Blob store. Use `vercel dev` when testing the complete submission flow locally.

## Enable administrator login on Vercel

No default username or password is included. Configure your own administrator credentials:

1. Run `npm run create-admin-credentials` and choose a password containing at least 12 characters.
2. In **Vercel → Project Settings → Environment Variables**, add `ADMIN_USERNAME` with your chosen username.
3. Add the generated `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET` values.
4. Optionally add `ADMIN_DISPLAY_NAME` and `ADMIN_EMAIL` for the Profile section.
5. Redeploy the project and test the Login button.

Login uses an HTTP-only, signed, same-site cookie that expires after eight hours. Use `vercel dev` to test the complete login flow locally.

## Enable CV submissions on Vercel

1. Open the Vercel project and select **Storage**.
2. Create a **Blob** store and choose **Private** access.
3. Connect the store to this project so Vercel supplies `BLOB_READ_WRITE_TOKEN`.
4. Redeploy the project, then submit a small test CV from `upload-cv.html`.
5. Sign in to the website administrator portal to review applications, update candidate statuses, and download CVs securely.

The same private Blob store contains the administrator-managed job document. Jobs marked **Active** are returned by the public jobs API and immediately displayed on the Find Your Job page. Keep the Blob store connected to every Vercel environment where this functionality should work.

## Before publishing

1. Add verified phone, email, office address, and social links.
2. Connect the contact form to your email service, and optionally forward stored CV applications to your recruitment mailbox or ATS.
3. Replace talent-community areas with verified live vacancies when available.
