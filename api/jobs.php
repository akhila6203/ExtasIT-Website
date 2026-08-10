<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
header('Content-Type: application/json; charset=UTF-8');

function deriveJobCategory(string $title, string $description, string $jobType): string {
    $haystack = strtolower(trim($title . ' ' . $description . ' ' . $jobType));

    if (str_contains($haystack, 'hr') || str_contains($haystack, 'recruitment') || str_contains($haystack, 'business')) {
        return 'Business & HR';
    }

    if (str_contains($haystack, 'engineer') || str_contains($haystack, 'mechanical') || str_contains($haystack, 'civil') || str_contains($haystack, 'technical')) {
        return 'Engineering';
    }

    if (str_contains($haystack, 'consult') || str_contains($haystack, 'strategy') || str_contains($haystack, 'advisory')) {
        return 'Consulting';
    }

    if (str_contains($haystack, 'technology') || str_contains($haystack, 'developer') || str_contains($haystack, 'software') || str_contains($haystack, 'cloud') || str_contains($haystack, 'data') || str_contains($haystack, 'devops')) {
        return 'Technology';
    }

    return 'Technology';
}

$result = db()->query("SELECT id,job_id, title,company,location,experience,job_type,salary_min,salary_max,description,requirements,responsibilities,benefits,vacancies,status,created_at FROM jobs WHERE status='Active' ORDER BY created_at DESC");
$jobs = [];
while ($row = $result->fetch_assoc()) {
    $title = (string) ($row['title'] ?? '');
    $description = (string) ($row['description'] ?? '');
    $jobType = (string) ($row['job_type'] ?? '');

    $jobs[] = [
        'id' => (string) $row['id'],
        'jobCode' => $row['job_id'],
        'job_id' => (string) $row['job_id'],
        'title' => $title,
        'company' => $row['company'],
        'location' => $row['location'],
        'experience' => $row['experience'],
        'jobType' => $jobType,
        'category' => deriveJobCategory($title, $description, $jobType),
        'salaryMin' => $row['salary_min'] !== null ? (float) $row['salary_min'] : null,
        'salaryMax' => $row['salary_max'] !== null ? (float) $row['salary_max'] : null,
        'description' => $description,
        'requirements' => $row['requirements'],
        'responsibilities' => $row['responsibilities'],
        'benefits' => $row['benefits'],
        'vacancies' => (int) $row['vacancies'],
        'status' => $row['status'],
        'postedAt' => $row['created_at'],
        'created_at' => $row['created_at'],
    ];
}
jsonResponse(['success' => true, 'jobs' => $jobs, 'total' => count($jobs)]);
