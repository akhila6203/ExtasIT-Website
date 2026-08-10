<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php'; require_once __DIR__ . '/../config/auth.php'; requireAdmin();
$id=(int)($_GET['id']??0);if($id<=0)jsonResponse(['success'=>false,'message'=>'Invalid application id.'],422);
$stmt=db()->prepare("SELECT a.id,a.full_name,a.email,a.phone,a.experience,a.current_company,a.preferred_area,a.resume,a.cover_letter,a.status,a.created_at,j.id job_id,j.title job_title,j.company job_company,j.description job_description FROM applications a LEFT JOIN jobs j ON j.id=a.job_id WHERE a.id=? LIMIT 1");
$stmt->bind_param('i',$id);$stmt->execute();$r=$stmt->get_result();if($r->num_rows===0)jsonResponse(['success'=>false,'message'=>'Application not found.'],404);
jsonResponse(['success'=>true,'application'=>$r->fetch_assoc()]);
