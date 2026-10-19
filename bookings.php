<?php
header("Content-Type: application/json");
include "config.php";
include "protected.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if($method == "GET"){
    $jwtUser = protect();
    $user_id = isset($jwtUser['id']) ? $jwtUser['id'] : null;

    if (!$user_id && isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
    }

    if (isset($_GET['id'])) {
        if ($user_id == 11) {
            $stmt = $conn->prepare("SELECT * FROM bookings WHERE id = ?");
            $stmt->bind_param("i", $_GET['id']);
        }  else {
            $stmt = $conn->prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ?");
            $stmt->bind_param("ii", $_GET['id'], $user_id);
        }
    }

    else {
        if ($user_id == 11) {
            $stmt = $conn->prepare("SELECT * FROM bookings");
        }  else {
            $stmt = $conn->prepare("SELECT * FROM bookings WHERE user_id = ?");
            $stmt->bind_param("i", $user_id);
        }
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

elseif($method == "POST"){
    $hasil_protect = protect();
    $token_id = $hasil_protect['id'];

    $user_id = $input['user_id'] ?? null;
    
    // verifyJWT();
    if (!isset($input['user_id']) || !isset($input['hotel_id']) || !isset($input['room_id']) || !isset($input['total_price']) || !isset($input['status'])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }
    if ($token_id != $user_id) {
        http_response_code(400);
        echo json_encode([
            "message" => "User ID tidak sama dengan user token",
            http_response_code()
        ]);
        return;
    }

    $room_id = $input['room_id'];
    $checkduplikasi = mysqli_query($conn, "SELECT * FROM bookings WHERE room_id='$room_id' AND status IN ('pending', 'confirmed') ");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "room_id duplikat!, room_id tidak boleh sama",
            "status code" => http_response_code()
        ]);
        return;
    };

    $refresh_increment = mysqli_query($conn,"ALTER TABLE bookings AUTO_INCREMENT = 1;");
    $stmt = $conn->prepare("
        INSERT INTO bookings
        (user_id, hotel_id, room_id, check_in, check_out,total_price, status)
        VALUES (?, ?, ?, CURRENT_DATE(),NULL, ?, ?)
    "); 

    $stmt->bind_param(
        "iiids",
        $input['user_id'],
        $input['hotel_id'],
        $input['room_id'],
        // $input['check_in'],
        $input['total_price'],
        $input['status'],
        // $input['']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Booking berhasil ditambahkan"
        ]);

    } else {
        http_response_code(403);
        echo json_encode([
            "message" => "Gagal booking kamar",
            "SQL Error: " . $stmt->error,
            http_response_code()
        ]);
    }
}

elseif($method == "PUT"){
    $hasil_protect = protect();
    $token_id = $hasil_protect['id'];

    $id = $input['id'] ?? null;
    $user_id = $input['user_id'] ?? null;
    $room_id = $input['room_id'] ?? null;
    $hotel_id = $input['hotel_id'] ?? null;

    if (!isset($input['id']) || !isset($input['check_in']) ||  !isset($input['check_out']) || !isset($input['total_price']) || !isset($input['status'])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            http_response_code()
        ]);
        return;
    }

    if ($token_id != $user_id) {
        http_response_code(400);
        echo json_encode([
            "message" => "User ID tidak sama dengan user token",
            http_response_code()
        ]);
        return;
    }

    $checkapakahadaID = mysqli_query($conn, "SELECT * FROM bookings WHERE id ='$id'");
    $numrows = mysqli_num_rows($checkapakahadaID);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([  
            "message" => "ID tidak ditemukan!",
            http_response_code()
        ]);
        return;
    };

    $checkduplikasi = mysqli_query($conn, "SELECT * FROM bookings WHERE room_id='$room_id' AND id != '$id' AND status IN ('pending', 'confirmed')");
    $numrows = mysqli_num_rows($checkduplikasi);

    if ($numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "room_number duplikat!, room_number tidak boleh sama",
            "status code" => http_response_code()
        ]);
        return;
    };

    // $check_apakah_room_ada_di_hotel = mysqli_query($conn, "SELECT * FROM bookings WHERE hotel_id='$hotel_id' AND room_id='$room_id' ");
    // $numrows = mysqli_num_rows($check_apakah_room_ada_di_hotel);
    // if ($numrows) {
    //     http_response_code(403);
    //     echo json_encode([
    //         "message" => "room_id $room_id tidak ditemukan di id hotel $hotel_id",
    //         "status code" => http_response_code()
    //     ]);
    //     return;
    // };

    $stmt = $conn->prepare("
        UPDATE bookings
        SET check_in = ?, check_out = ?, total_price = ?, status = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "ssdsi",
        $input['check_in'],
        $input['check_out'],
        $input['total_price'],
        $input['status'],
        $input['id']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Booking berhasil diupdate"
        ]);
    } else {
        echo json_encode([
            "message" => "Gagal update booking"
        ]);
    }
}


elseif($method == "DELETE"){
    protect();
    $id = $input['id'];
    if (!isset($input['id']) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            "status code" => http_response_code()
        ]);
        return;
    }
    
    $checkapakahada = mysqli_query($conn, "SELECT * FROM bookings WHERE id='$id' ");
    $numrows = mysqli_num_rows($checkapakahada);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "ID tidak ditemukan",
            http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){
        echo json_encode([
            "message" => "Booking berhasil dihapus"
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Gagal menghapus booking",
            http_response_code(400)
        ]);
    }
}

?>