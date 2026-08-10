<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
$id=(int)($_GET['id']??0);
if($id<=0) jsonResponse(['success'=>false,'message'=>'Invalid job id.'],422);
$stmt=db()->prepare("SELECT id,job_id,title,company,location,experience,job_type,salary_min,salary_max,description,requirements,responsibilities,benefits,vacancies,status,created_at FROM jobs WHERE id=? AND status='Active' LIMIT 1");
$stmt->bind_param('i',$id);$stmt->execute();$result=$stmt->get_result();
if($result->num_rows===0) jsonResponse(['success'=>false,'message'=>'Job not found.'],404);
$view=db()->prepare('INSERT INTO job_views(job_id) VALUES(?)');$view->bind_param('i',$id);$view->execute();
$row=$result->fetch_assoc();
jsonResponse(['success'=>true,'job'=>$row]);
