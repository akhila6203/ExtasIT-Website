# ExtasIT HTML + PHP + MySQL upgrade

This build keeps the existing ExtasIT public HTML pages and styling as the base. The recruitment/jobs backend is migrated from the old Vercel/JS storage to PHP + MySQL.

## Main changes
1. Lares-style admin panel structure copied into `admin/`, using `css/panel.css` and `js/*-admin.js`.
2. PHP session login at `/admin/login.php`.
3. Default admin: username `admin`, password `admin123`.
4. Jobs are stored in MySQL and created/edited/deleted from Admin > Jobs.
5. Only `Active` jobs are exposed publicly through `/api/jobs.php`.
6. Find Job page has View Details + Apply popup and CV upload.
7. Applications are stored in MySQL and shown in Admin > Applications.
8. Register dropdown before Upload CV: Students, Instructors, Hire From Us.
9. Register forms open as a top-right popup and post to `/api/submit-inquiry.php`.
10. Contact page is connected to the same PHP enquiry endpoint.
11. `config/mail.php` controls the destination email address.

## MySQL
Import `database/extasit.sql` in phpMyAdmin.

Then edit `config/database.php` if your hosting credentials are not supplied through environment variables.

## Email
Edit:
- `config/mail.php`
- `SITE_EMAIL`
- `SITE_FROM`

Use real mailboxes on the deployed domain. On shared hosting, PHP `mail()` depends on the host's mail configuration. If SMTP is required, replace `sendSiteMail()` with PHPMailer/SMTP.

## Hosting
Upload the project so that:
- `/admin/` is directly under the domain root
- `/ajax/` is directly under the domain root
- `/api/` is directly under the domain root
- `/config/` is directly under the domain root
- `/uploads/resumes/` is writable by PHP

Public pages such as `index.html`, `about.html`, `find-job.html`, and `contact.html` remain at the root.

## Important
Do not copy the entire LaresIT project over ExtasIT. Only the Lares-style admin panel assets/structure were used. The ExtasIT public pages remain the source of truth.

## Admin flow
`Login -> /admin/login.php -> /admin/dashboard.php -> Jobs -> Post New Job -> Active -> Find Your Job -> View Details -> Apply -> Admin Applications`

