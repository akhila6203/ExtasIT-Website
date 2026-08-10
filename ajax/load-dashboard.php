<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php'; require_once __DIR__ . '/../config/auth.php'; requireAdmin();
$totalJobs=(int)db()->query('SELECT COUNT(*) total FROM jobs')->fetch_assoc()['total'];
$totalApplications=(int)db()->query('SELECT COUNT(*) total FROM applications')->fetch_assoc()['total'];
$viewsToday=(int)db()->query("SELECT COUNT(*) total FROM job_views WHERE DATE(viewed_at)=CURDATE()")->fetch_assoc()['total'];
$selected=(int)db()->query("SELECT COUNT(*) total FROM applications WHERE status='Selected'")->fetch_assoc()['total'];
$hireRate=$totalApplications?round($selected/$totalApplications*100):0;
$recent=[];$r=db()->query("SELECT a.id,a.full_name,a.experience,a.status,a.created_at,COALESCE(j.title,'Talent Network') job_title FROM applications a LEFT JOIN jobs j ON j.id=a.job_id ORDER BY a.created_at DESC LIMIT 8");while($row=$r->fetch_assoc())$recent[]=$row;
$active=[];$r=db()->query("SELECT j.id,j.title,j.location,j.status,(SELECT COUNT(*) FROM applications a WHERE a.job_id=j.id) applicants FROM jobs j WHERE j.status='Active' ORDER BY j.created_at DESC LIMIT 8");while($row=$r->fetch_assoc())$active[]=$row;
jsonResponse(['success'=>true,'stats'=>['total_jobs'=>$totalJobs,'total_applications'=>$totalApplications,'views_today'=>$viewsToday,'hire_rate'=>$hireRate],'recent_applications'=>$recent,'active_jobs'=>$active]);
