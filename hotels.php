<?php
header("Content-Type: application/json");
include "config.php";
include "protected.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if($method == "GET"){
    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("SELECT * FROM hotels WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
    
    } elseif (isset($_GET['location'])) {
        $location = "%" . $_GET['location'] . "%";
        $stmt = $conn->prepare("SELECT * FROM hotels WHERE location LIKE ?");
        $stmt->bind_param("s", $location);

    } else {
        $stmt = $conn->prepare("SELECT * FROM hotels");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

elseif($method == "POST"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);

    $name = $input['name'];

     if (!isset($input['name']) || !isset($input['location']) || !isset($input['description'])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }


    $checkduplikasi = mysqli_query($conn, "SELECT * FROM hotels WHERE name='$name' ");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "name hotel duplikat!, name hotel tidak boleh sama",
            http_response_code()
        ]);
        return;
    };

    $refresh_increment = mysqli_query($conn,"ALTER TABLE hotels AUTO_INCREMENT = 1;");
    $stmt = $conn->prepare("
        INSERT INTO hotels
        (name, location, description)
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param(
        "sss",
        $input['name'],
        $input['location'],
        $input['description']
    );

    if($stmt->execute()){
        
        echo json_encode([
            "message" => "Hotel berhasil ditambahkan"
        ]);
    } else {
        http_response_code(403);
        echo json_encode([
            "message" => "Gagal menambahkan hotel",
            http_response_code()
        ]);
    }
}

elseif($method == "PUT"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);

    $id = $input['id'] ?? null;
    $name = $input['name'] ?? null;
    
    if (!isset($input['id']) || !isset($input['name']) || !isset($input['location']) || !isset($input['description']) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }

    $checkapakahadaID = mysqli_query($conn, "SELECT * FROM hotels WHERE id ='$id'");
    $numrows = mysqli_num_rows($checkapakahadaID);
    if (!$numrows) {
        http_response_code(403);
        echo json_encode([  
            "message" => "ID tidak ditemukan!",
            http_response_code()
        ]);

        return;
    };

    
    $check_apakahedit_data_yang_sama = mysqli_query($conn, "SELECT * FROM hotels WHERE id ='$id' AND name='$name' ");
    $numrows1 = mysqli_num_rows($check_apakahedit_data_yang_sama);

    $checkduplikasi = mysqli_query($conn, "SELECT * FROM hotels WHERE name='$name'");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        if ($numrows1) {
            true;
        }else { 
            http_response_code(403);  
            echo json_encode([
                "message" => "name hotel duplikat!, name hotel tidak boleh sama",
                http_response_code()
            ]);
            return;
        }
        
    };

    $stmt = $conn->prepare("
        UPDATE hotels
        SET name = ?, location = ?, description = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "sssi",
        $input['name'],
        $input['location'],
        $input['description'],
        $input['id']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Hotel berhasil diupdate"
        ]);
    } else {
        http_response_code(403);
        echo json_encode([
            "message" => "Gagal update hotel",
            http_response_code()
        ]);
    }
}

elseif($method == "DELETE"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);

    $id = $input['id'] ?? null;
    $checkapakahada = mysqli_query($conn, "SELECT * FROM hotels WHERE id='$id' ");
    $numrows = mysqli_num_rows($checkapakahada);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "ID tidak ditemukan",
            http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("DELETE FROM hotels WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){
        echo json_encode([
            "message" => "Hotel berhasil dihapus"
        ]);
    } else {
        http_response_code();
        echo json_encode([
            "message" => "Gagal menghapus hotel",
            http_response_code()
        ]);
    }
}

?>