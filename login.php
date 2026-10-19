<?php
require "config.php";
require "vendor/autoload.php";

use Firebase\JWT\JWT;

$key = "b074c52d5fe35d474a0d99f56a319a69";

header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['email']) && isset($input['password'])) {
    $email = $input['email']; 
    $password = md5($input['password']); 

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    $stmt-> bind_param("ss", $email, $password);
    $stmt-> execute();
    $result = $stmt -> get_result() -> fetch_assoc();

    if ($result) {
        $payload = [
            "id" => $result['id'],
            "email" => $result['email'],
            // "result" => $result,
            "exp" => time() + 3600 // Token berlaku 1 jam

        ];
        $jwt = JWT::encode($payload, $key, 'HS256');

        echo json_encode(["message" => "Login successful", 
        "result" => $result,
        "token" => $jwt]);
        
    } else {
        echo json_encode(["message" => "User tidak ditemukan, daftar terlebih dahulu",
        // "password?" => $password, 
        // "email?" => $email,
        // "result" => $result
        ]
         );
    }

}  else {
    echo json_encode(["message" => "email and password are required"]);
}

?> 