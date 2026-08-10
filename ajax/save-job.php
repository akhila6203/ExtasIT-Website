<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

requireAdmin();

header('Content-Type: application/json; charset=UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}


$id = (int) ($_POST['id'] ?? 0);
// $jobId = sanitize($_POST['job_id']);
$jobId = sanitize($_POST['job_id'] ?? '');
$title = sanitize($_POST['title'] ?? '');
$company = sanitize($_POST['company'] ?? '');
$location = sanitize($_POST['location'] ?? '');
$experience = sanitize($_POST['experience'] ?? '');
$jobType = sanitize($_POST['job_type'] ?? '');
$salaryMin = $_POST['salary_min'] ?? '';
$salaryMax = $_POST['salary_max'] ?? '';
$description = sanitize($_POST['description'] ?? '');
$requirements = sanitize($_POST['requirements'] ?? '');
$responsibilities = sanitize($_POST['responsibilities'] ?? '');
$benefits = sanitize($_POST['benefits'] ?? '');
$vacancies = max(1, (int) ($_POST['vacancies'] ?? 1));
$status = sanitize($_POST['status'] ?? 'Active');

$allowedStatus = ['Active', 'Inactive', 'Closed'];
if (!in_array($status, $allowedStatus, true)) {
    $status = 'Active';
}

if ($title === '' || $company === '' || $location === '' || $description === '') {
    jsonResponse(['success' => false, 'message' => 'Please fill all required fields.'], 422);
}

// $salaryMinVal = $salaryMin !== '' ? (float) $salaryMin : null;
// $salaryMaxVal = $salaryMax !== '' ? (float) $salaryMax : null;
$salaryMinVal = $salaryMin !== '' ? $salaryMin : null;
$salaryMaxVal = $salaryMax !== '' ? $salaryMax : null;

if ($id > 0) {
    $stmt = db()->prepare(
        'UPDATE jobs SET job_id=?, title=?, company=?, location=?, experience=?, job_type=?,
         salary_min=?, salary_max=?, description=?, requirements=?, responsibilities=?,
         benefits=?, vacancies=?, status=? WHERE id=?'
    );
    $stmt->bind_param(
    "ssssssddssssisi",
    $jobId,
    $title,
    $company,
    $location,
    $experience,
    $jobType,
    $salaryMinVal,
    $salaryMaxVal,
    $description,
    $requirements,
    $responsibilities,
    $benefits,
    $vacancies,
    $status,
    $id
);
    // $stmt->bind_param(
    //     'sssssddssssisi',
    //     $title,
    //     $jobId,
    //     $company,
    //     $location,
    //     $experience,
    //     $jobType,
    //     $salaryMinVal,
    //     $salaryMaxVal,
    //     $description,
    //     $requirements,
    //     $responsibilities,
    //     $benefits,
    //     $vacancies,
    //     $status,
    //     $id
    // );

    if (!$stmt->execute()) {
    jsonResponse([
        "success" => false,
        "message" => $stmt->error
    ], 500);
}

jsonResponse([
    "success" => true,
    "message" => "Job updated successfully.",
    "id" => $id
]);
    // if ($stmt->execute()) {
    //     jsonResponse(['success' => true, 'message' => 'Job updated successfully.', 'id' => $id]);
    // }

    // jsonResponse(['success' => false, 'message' => 'Unable to update job.'], 500);
}

$stmt = db()->prepare(
    'INSERT INTO jobs (job_id,title, company, location, experience, job_type, salary_min, salary_max,
     description, requirements, responsibilities, benefits, vacancies, status)
     VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->bind_param(
    "ssssssddssssis",
    $jobId,
    $title,
    $company,
    $location,
    $experience,
    $jobType,
    $salaryMinVal,
    $salaryMaxVal,
    $description,
    $requirements,
    $responsibilities,
    $benefits,
    $vacancies,
    $status
);
// $stmt->bind_param(
//     'sssssddssssis',
//     $title,
//     $company,
//     $jobId,
//     $location,
//     $experience,
//     $jobType,
//     $salaryMinVal,
//     $salaryMaxVal,
//     $description,
//     $requirements,
//     $responsibilities,
//     $benefits,
//     $vacancies,
//     $status
// );

if (!$stmt->execute()) {
    jsonResponse([
        "success" => false,
        "message" => $stmt->error
    ], 500);
}

jsonResponse([
    "success" => true,
    "message" => "Job posted successfully.",
    "id" => db()->insert_id
]);
// if ($stmt->execute()) {
//     jsonResponse([
//         'success' => true,
//         'message' => 'Job posted successfully.',
//         'id' => db()->insert_id,
//     ]);
// }

// jsonResponse(['success' => false, 'message' => 'Unable to save job.'], 500);
