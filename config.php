<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$username = "root";
$password = "";
$db_name = "hotel";

$conn = new mysqli($host,$username,$password,$db_name);

if ($conn->connect_error) {
    echo json_encode([
        'status'=>'error',
        'message'=>'Database connection failed'
    ]);
    return;
}
 