<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') jsonResponse(['success'=>false,'message'=>'Invalid request method.'],405);
$username=sanitize($_POST['username']??''); $password=(string)($_POST['password']??'');
if($username===''||$password==='') jsonResponse(['success'=>false,'message'=>'Please enter username and password.'],422);
$stmt=db()->prepare('SELECT id,username,password,name,email FROM admin WHERE username=? LIMIT 1');
$stmt->bind_param('s',$username);$stmt->execute();$result=$stmt->get_result();
if(!$result||$result->num_rows===0) jsonResponse(['success'=>false,'message'=>'Invalid username or password.'],401);
$admin=$result->fetch_assoc();
if(!verifyPassword($password,$admin['password'])) jsonResponse(['success'=>false,'message'=>'Invalid username or password.'],401);
session_regenerate_id(true);
$_SESSION['admin_id']=(int)$admin['id'];$_SESSION['admin_username']=$admin['username'];$_SESSION['admin_name']=$admin['name'];$_SESSION['admin_email']=$admin['email'];
jsonResponse(['success'=>true,'message'=>'Login successful.','redirect'=>base_url('/admin/dashboard.php')]);
