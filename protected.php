<?php 
require "middleware.php"; 
include "config.php";

header("Content-Type: application/json"); 

function protect() {
    $user = verifyJWT(); // Middleware akan memeriksa token 

    if (isset($user)) {
        echo json_encode([ 
            "message" => "Token Valid", 
            "user" => $user
        ]); 
        return json_decode(json_encode($user), true);
    }
    
}

function check_apakah_admin($conn, $user_id) {
    $check_admin = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM users WHERE id=$user_id AND role ='admin'"));

    if (!$check_admin) {
        http_response_code(403);
        echo json_encode([
            "message" => "Tidak ada akses",
            "status code" => http_response_code()
        ]);
        exit();
    };
};
?>