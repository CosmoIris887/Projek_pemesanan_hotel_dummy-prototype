<?php
header("Content-Type: application/json");
include "config.php";
include "protected.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);


if($method == "GET"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];
        
    if (isset($_GET['profile'])) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        
    } else {
        check_apakah_admin($conn, $user_id);

        if (isset($_GET['id'])) {
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->bind_param("i", $_GET['id']);

        }  elseif (isset($_GET['name'])) {
            $name = "%" . $_GET['name'] . "%";
            $stmt = $conn->prepare("SELECT * FROM users WHERE name LIKE ?");
            $stmt->bind_param("s", $name);

        } else {
            $stmt = $conn->prepare("SELECT * FROM users");
        }
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

elseif($method == "POST"){
    $name = $input['name'] ?? null;
    $email = $input['email'] ?? null;
    $password = md5($input['password'] ?? null) ;

     if (!isset($email) || !isset($name) || !isset($password) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            "status code" => http_response_code()
        ]);
        return;

    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            "message" => "Email tidak valid!",
            "status code" => http_response_code()
        ]);
        return;
    }

    $checkduplikasi = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM users WHERE email='$email' "));
    // $numrows = ;
    if ($checkduplikasi) {
        http_response_code(403);
        echo json_encode([
            "message" => "Ada duplikasi!",
            "status code" => http_response_code()
        ]);
        return;
    };

    $refresh_increment = mysqli_query($conn,"ALTER TABLE users AUTO_INCREMENT = 1;");
    $stmt = $conn->prepare("INSERT INTO users (name, role, email, password) VALUES (?,'customer', ?, ?)");
    $stmt->bind_param(
        "sss",
        $name,
        $email,
        $password
    );

    if($stmt->execute()){
        http_response_code(201);
        echo json_encode([
            "message" => "User berhasil ditambahkan",
            "status code" => http_response_code()
            ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menambahkan user",
            "SQL Error: " . $stmt->error,
            "status code" => http_response_code()
        ]);
    }
}

elseif($method == "PUT"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];
    $password = md5($input['password'] ?? null) ;
    $id = $input['id'] ?? null;
    $name = $input['name'] ?? null;
    // $email = $input['email'];
    
    // return;
    if (!isset($name) || !isset($password) || !isset($id) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            "status code" => http_response_code()
        ]);
        return;
        
    }
        
    $checkapakahada = mysqli_query($conn, "SELECT * FROM users WHERE id='$id'");
    $numrows = mysqli_num_rows($checkapakahada);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "User dengan $id tersebut tidak ada!",
            "status code" => http_response_code()
        ]);
        return;
    };

    if ($user_id != $id) {
         http_response_code(403);
        echo json_encode([
            "message" => "Akses ditolak, user_id tidak sesuai dengan user token",
            "status code" => http_response_code()
        ]);
        return;
    }
   
    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     http_response_code(400);
    //     echo json_encode([
    //         "message" => "Email tidak valid!",
    //         "status code" => http_response_code()
    //     ]);
    //     return;
    // }

    // $checkduplikasi = mysqli_query($conn, "SELECT * FROM users WHERE email='$email' ");
    // $numrows = mysqli_num_rows($checkduplikasi);

    // if ($numrows) {
    //     http_response_code(403);
    //     echo json_encode([
    //         "message" => "Email duplikat!, email tidak boleh sama",
    //         "status code" => http_response_code()
    //     ]);
    //     return;
    // };

    $stmt = $conn->prepare("UPDATE users SET name = ?,  password = ? WHERE id = ?");
    $stmt->bind_param(
        "ssi",
        $name,
        $password,
        $id
    );

    if($stmt->execute()){
        http_response_code(201);
        echo json_encode([
            "message" => "User berhasil diupdate",
            "status code" => http_response_code()
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal update user",
            "status code" => http_response_code()
        ]);
    }
}

elseif($method == "DELETE"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];
    check_apakah_admin($conn, $user_id);

    $id = $input['id'] ?? null;
    $checkapakahada = mysqli_query($conn, "SELECT * FROM users WHERE id='$id' ");
    $numrows = mysqli_num_rows($checkapakahada);

     if (!isset($id) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menghapus, ID kosong",
            "status code" => http_response_code()
        ]);
        return;

    }

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "ID tidak ditemukan",
            "status code" => http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){
        http_response_code(200);
        echo json_encode([
            "message" => "User berhasil dihapus",
            http_response_code()
            ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menghapus user",
            http_response_code()
        ]);
    }
}

?>