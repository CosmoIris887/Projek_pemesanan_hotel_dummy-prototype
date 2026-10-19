<?php
require "vendor/autoload.php"; 

use Firebase\JWT\JWT; 
use Firebase\JWT\Key; 



function verifyJWT() { 
    $key = "b074c52d5fe35d474a0d99f56a319a69";
    
    $headers = getallheaders();
    $authHeader = null;
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } elseif (isset($headers['authorization'])) {
        $authHeader = $headers['authorization'];
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }

    if (!$authHeader) { 
        echo json_encode(["message" => "Token required"]); 
        http_response_code(401); 
        exit; 
    };

    $token = str_replace("Bearer ", "", $authHeader); 

    try { 
        $decoded = JWT::decode($token, new Key($key, 'HS256')); 
        return $decoded; 
    } catch (Exception $e) { 
        echo json_encode(["message" => "Invalid token"]); 
        http_response_code(401); 
        exit; 
    } 
};

function wajibAdmin(Array $user) {
    // $result = $conn;
    // echo json_encode($user['id']);
    // $check_id = $user["id"];
    // $result = mysqli_query($conn, "SELECT * FROM users WHERE id=$check_id ");
    // echo json_encode($result);

}
?>