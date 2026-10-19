<?php
header("Content-Type: application/json");
include "config.php";
include "protected.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if($method == "GET"){
    $id = $_GET['id'] ?? null;
    $hotel_id = $_GET['hotel_id'] ?? null;
    $room_type_id = $_GET['room_type_id'] ?? null;
    
    if (isset($hotel_id) && isset($room_type_id)) {
        $stmt = $conn->prepare("SELECT * FROM rooms WHERE hotel_id= ? AND room_type_id = ?");
        $stmt->bind_param("ii", $hotel_id, $room_type_id);
    }

    elseif (isset($id)) {
        $stmt = $conn->prepare("SELECT * FROM rooms WHERE id = ?");
        $stmt->bind_param("i", $id);

    } elseif (isset($hotel_id)) {
        $stmt = $conn->prepare("SELECT * FROM rooms WHERE hotel_id = ?");
        $stmt->bind_param("i", $hotel_id);

    } elseif (isset($room_type_id)) {
        $stmt = $conn->prepare("SELECT * FROM rooms WHERE room_type_id = ?");
        $stmt->bind_param("i", $room_type_id);

    } else {
        $stmt = $conn->prepare("SELECT * FROM rooms");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));

}

elseif($method == "POST"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);

    if (!isset($input['hotel_id']) || !isset($input['room_type_id']) || !isset($input['price']) || !isset($input['room_number'])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }

    $room_number = $input['room_number'];
    $hotel_id = $input['hotel_id'];
    $checkduplikasi = mysqli_query($conn, "SELECT * FROM rooms WHERE room_number='$room_number' AND hotel_id='$hotel_id' ");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "room_number duplikat!, room_number tidak boleh sama",
            http_response_code()
        ]);
        return;
    };

    $refresh_increment = mysqli_query($conn,"ALTER TABLE rooms AUTO_INCREMENT = 1;");
    $stmt = $conn->prepare("
        INSERT INTO rooms
        (hotel_id, room_type_id, room_number, price)
        VALUES (?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "iisd",
        $input['hotel_id'],
        $input['room_type_id'],
        $input['room_number'],
        $input['price']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Room berhasil ditambahkan"
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menambahkan room",
            http_response_code()
        ]);
    }
}

elseif($method == "PUT"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);

    $id = $input['id'] ?? null;
    $room_number = $input['room_number']?? null;
    $hotel_id = $input['hotel_id']?? null;

    $checkapakahadaID = mysqli_query($conn, "SELECT * FROM rooms WHERE id ='$id'");
    $numrows = mysqli_num_rows($checkapakahadaID);
    if (!$numrows) {
        http_response_code(403);
        echo json_encode([  
            "message" => "ID tidak ditemukan!",
            http_response_code()
        ]);
        return;
    };

    if (!isset($input['id']) || !isset($input['hotel_id']) || !isset($input['room_type_id']) || !isset($input['price']) || !isset($input['room_number'])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }
    $check_apakahedit_data_yang_sama = mysqli_query($conn, "SELECT * FROM rooms WHERE id ='$id' AND room_number='$room_number' ");
    $numrows1 = mysqli_num_rows($check_apakahedit_data_yang_sama);

    $checkduplikasi = mysqli_query($conn, "SELECT * FROM rooms WHERE room_number='$room_number' AND hotel_id = $hotel_id");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        if ($numrows1) {
            true;
        }else {   
            http_response_code(403);
            echo json_encode([
                "message" => "room_number duplikat!, room_number tidak boleh sama",
                http_response_code()
            ]);
            return;
        }
        
    };

    $stmt = $conn->prepare("
        UPDATE rooms
        SET hotel_id = ?, room_type_id = ?, room_number = ?, price = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "iisdi",
        $input['hotel_id'],
        $input['room_type_id'],
        $input['room_number'],
        $input['price'],
        $input['id']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Room berhasil diupdate"
        ]);
    } else {
        http_response_code(403);
        echo json_encode([
            "message" => "Gagal update room",
            http_response_code()
        ]);
    }
}


elseif($method == "DELETE"){
    $hasil_protect = protect();
    $user_id = $hasil_protect['id'];

    check_apakah_admin($conn, $user_id);
    $id = $input['id'];
    $checkapakahada = mysqli_query($conn, "SELECT * FROM rooms WHERE id='$id' ");
    $numrows = mysqli_num_rows($checkapakahada);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "ID tidak ditemukan",
            http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("DELETE FROM rooms WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){

        echo json_encode([
            "message" => "Room berhasil dihapus"
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menghapus room",
            http_response_code(400)
        ]);
    }
}

?>