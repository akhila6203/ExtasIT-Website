CREATE DATABASE IF NOT EXISTS extasit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE extasit;

CREATE TABLE IF NOT EXISTS admin (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(80) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 name VARCHAR(120) NOT NULL,
 email VARCHAR(160) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS jobs (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 job_id VARCHAR(50) NOT NULL UNIQUE,
 title VARCHAR(200) NOT NULL,
 company VARCHAR(160) NOT NULL,
 location VARCHAR(160) NOT NULL,
 experience VARCHAR(80) NOT NULL DEFAULT '',
 job_type VARCHAR(60) NOT NULL DEFAULT 'Full Time',
 salary_min DECIMAL(12,2) NULL,
 salary_max DECIMAL(12,2) NULL,
 description TEXT NOT NULL,
 requirements TEXT NULL,
 responsibilities TEXT NULL,
 benefits TEXT NULL,
 vacancies INT UNSIGNED NOT NULL DEFAULT 1,
 status ENUM('Active','Inactive','Closed') NOT NULL DEFAULT 'Active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_jobs_status(status), INDEX idx_jobs_created(created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS applications (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 job_id INT UNSIGNED NULL,
 full_name VARCHAR(160) NOT NULL,
 email VARCHAR(190) NOT NULL,
 phone VARCHAR(40) NOT NULL,
 experience VARCHAR(100) NOT NULL DEFAULT '',
 current_company VARCHAR(160) NULL,
 preferred_area VARCHAR(120) NULL,
 resume VARCHAR(255) NULL,
 cover_letter TEXT NULL,
 status ENUM('Pending','Selected','Rejected','On Hold') NOT NULL DEFAULT 'Pending',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_applications_job FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE SET NULL ON UPDATE CASCADE,
 INDEX idx_app_status(status), INDEX idx_app_created(created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS job_views (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 job_id INT UNSIGNED NULL,
 viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_job_views_job FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE SET NULL ON UPDATE CASCADE,
 INDEX idx_job_views_date(viewed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inquiries (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 inquiry_type ENUM('Student','Instructor','Hire From Us','Contact') NOT NULL,
 name VARCHAR(160) NOT NULL,
 email VARCHAR(190) NOT NULL,
 phone VARCHAR(40) NULL,
 company VARCHAR(160) NULL,
 subject VARCHAR(200) NULL,
 service VARCHAR(160) NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_inquiry_type(inquiry_type), INDEX idx_inquiry_created(created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default login: admin / admin123
INSERT INTO admin(username,password,name,email) VALUES
('admin','$2y$10$oHdD1laRirw10xt8hA..peMgyV5A3gQxG8UbE8.Z.f1mkFhpxcr8u','Admin','admin@extasit.com')
ON DUPLICATE KEY UPDATE username=username;


ALTER TABLE jobs
MODIFY salary_min DECIMAL(15,2) NULL,
MODIFY salary_max DECIMAL(15,2) NULL;