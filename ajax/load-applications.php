<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php'; require_once __DIR__ . '/../config/auth.php'; requireAdmin();
$page=max(1,(int)($_GET['page']??1));$limit=max(5,min(50,(int)($_GET['limit']??10)));$search=sanitize($_GET['search']??'');$offset=($page-1)*$limit;
$where='';$params=[];$types='';
if($search!==''){ $where=' WHERE a.full_name LIKE ? OR a.email LIKE ? OR j.title LIKE ? OR j.company LIKE ?';$like='%'.$search.'%';$params=[$like,$like,$like,$like];$types='ssss';}
$count=db()->prepare("SELECT COUNT(*) total FROM applications a LEFT JOIN jobs j ON j.id=a.job_id".$where);if($types)$count->bind_param($types,...$params);$count->execute();$total=(int)$count->get_result()->fetch_assoc()['total'];
$stmt=db()->prepare("SELECT a.id,a.full_name,a.email,a.phone,a.experience,a.status,a.created_at,a.resume,a.job_id,j.title job_title,j.company job_company FROM applications a LEFT JOIN jobs j ON j.id=a.job_id".$where." ORDER BY a.created_at DESC LIMIT ? OFFSET ?");
if($types){$types2=$types.'ii';$params2=[...$params,$limit,$offset];$stmt->bind_param($types2,...$params2);}else $stmt->bind_param('ii',$limit,$offset);
$stmt->execute();$r=$stmt->get_result();$apps=[];while($row=$r->fetch_assoc()){$apps[]=$row;}
jsonResponse(['success'=>true,'applications'=>$apps,'total'=>$total,'pagination'=>['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>(int)ceil($total/$limit)]]);
