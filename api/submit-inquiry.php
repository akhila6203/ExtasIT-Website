<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/mail.php';
if(($_SERVER['REQUEST_METHOD']??'')!=='POST') jsonResponse(['success'=>false,'message'=>'Invalid request method.'],405);

$type=sanitize($_POST['inquiry_type']??'Contact');$name=sanitize($_POST['name']??'');$email=strtolower(sanitize($_POST['email']??''));
$phone=sanitize($_POST['phone']??'');$company=sanitize($_POST['company']??'');$subject=sanitize($_POST['subject']??'');
$service=sanitize($_POST['service']??'');$message=sanitize($_POST['message']??'');
$allowed=['Student','Instructor','Hire From Us','Contact']; if(!in_array($type,$allowed,true)) $type='Contact';
if($name===''||$email===''||$message==='') jsonResponse(['success'=>false,'message'=>'Please complete all required fields.'],422);
if(!filter_var($email,FILTER_VALIDATE_EMAIL)) jsonResponse(['success'=>false,'message'=>'Enter a valid email address.'],422);
$stmt=db()->prepare('INSERT INTO inquiries(inquiry_type,name,email,phone,company,subject,service,message) VALUES(?,?,?,?,?,?,?,?)');
$stmt->bind_param('ssssssss',$type,$name,$email,$phone,$company,$subject,$service,$message);$stmt->execute();
$body="New ExtasIT enquiry\n\nType: $type\nName: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nSubject: $subject\nService: $service\n\nMessage:\n$message";
$sent=sendSiteMail('ExtasIT '.$type.' enquiry - '.$name,$body,$email);
jsonResponse(['success'=>true,'message'=>$sent?'Thank you. Your details have been sent successfully.':'Thank you. Your details were saved successfully.']);
