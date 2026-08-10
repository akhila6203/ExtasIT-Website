<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/mail.php';

const MAX_CV_SIZE = 4194304;
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Please submit your application using the Upload CV form.'], 405);
}

$clean = fn ($value) => sanitize((string) $value);
$name = $clean($_POST['full_name'] ?? $_POST['name'] ?? '');
$email = strtolower($clean($_POST['email'] ?? ''));
$phone = $clean($_POST['phone'] ?? '');
$area = $clean($_POST['area'] ?? 'Job application');
$currentCompany = $clean($_POST['current_company'] ?? $_POST['currentCompany'] ?? '');
$experience = $clean($_POST['experience'] ?? '');
$message = $clean($_POST['cover_letter'] ?? $_POST['message'] ?? '');
$jobId = (int) ($_POST['job_id'] ?? $_POST['jobId'] ?? 0);
$honeypot = $clean($_POST['website'] ?? '');

if ($honeypot !== '') {
    jsonResponse(['success' => true, 'message' => 'Your application has been received.']);
}

if ($name === '' || $email === '' || $phone === '' || $experience === '' || $message === '') {
    jsonResponse(['success' => false, 'message' => 'Complete every required field.'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'message' => 'Enter a valid email address.'], 422);
}

$allowedAreas = ['Software development', 'Cloud, data & DevOps', 'HR & recruitment', 'Engineering', 'Business & consulting', 'Job application'];
if (!in_array($area, $allowedAreas, true)) {
    jsonResponse(['success' => false, 'message' => 'Please select a valid preferred area.'], 422);
}

$job = null;
if ($jobId > 0) {
    $stmt = db()->prepare("SELECT id,job_id,title,company,location FROM jobs WHERE id=? AND status='Active' LIMIT 1");
    $stmt->bind_param('i', $jobId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        jsonResponse(['success' => false, 'message' => 'The selected job is no longer accepting applications.'], 409);
    }
    $job = $result->fetch_assoc();
}

$fileInputKey = isset($_FILES['cv']) ? 'cv' : (isset($_FILES['resume']) ? 'resume' : '');
if ($fileInputKey === '' || !isset($_FILES[$fileInputKey]) || ($_FILES[$fileInputKey]['error'] ?? 1) !== UPLOAD_ERR_OK) {
    jsonResponse(['success' => false, 'message' => 'Choose a CV file.'], 422);
}

$file = $_FILES[$fileInputKey];
if ((int) $file['size'] < 1 || (int) $file['size'] > MAX_CV_SIZE) {
    jsonResponse(['success' => false, 'message' => 'Choose a CV file smaller than 4 MB.'], 422);
}

$ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ['pdf', 'doc', 'docx'], true)) {
    jsonResponse(['success' => false, 'message' => 'Only PDF, DOC, and DOCX files are accepted.'], 422);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
$valid = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'],
];

if (!in_array($mime, $valid[$ext] ?? [], true)) {
    jsonResponse(['success' => false, 'message' => 'The selected file type is not valid.'], 422);
}

$dir = __DIR__ . '/../uploads/resumes';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$safe = 'resume_' . time() . '_' . bin2hex(random_bytes(5)) . '.' . $ext;
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $safe)) {
    jsonResponse(['success' => false, 'message' => 'Unable to upload your CV.'], 500);
}

$relative = 'uploads/resumes/' . $safe;
$stmt = db()->prepare("INSERT INTO applications(job_id,full_name,email,phone,experience,current_company,preferred_area,resume,cover_letter,status) VALUES(?,?,?,?,?,?,?,?,?,'Pending')");
$jid = $job !== null ? (int) $job['id'] : null;
$stmt->bind_param('issssssss', $jid, $name, $email, $phone, $experience, $currentCompany, $area, $relative, $message);
$stmt->execute();

$jobText = $job ? ($job['title'] . ' (' . $job['job_id'] . ')') : 'Talent Network';
$mailBody = "New ExtasIT CV/application\n\nName: $name\nEmail: $email\nPhone: $phone\nPreferred area: $area\nExperience: $experience\nJob: $jobText\n\nProfessional summary:\n$message\n\nCV: $relative";
sendSiteMail('New ExtasIT application - ' . $name, $mailBody, $email);

jsonResponse(['success' => true, 'message' => "Thank you, $name. Your profile and CV were submitted successfully."]);
