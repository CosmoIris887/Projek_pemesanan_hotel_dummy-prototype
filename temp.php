<?php
header("Content-Type: application/json");
include "config.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if($method == "GET"){

    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("SELECT * FROM bookings WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);

    } elseif (isset($_GET['room_id'])) {
        $room_id = "%" . $_GET['room_id'] . "%";
        $stmt = $conn->prepare("SELECT * FROM bookings WHERE room_id = ?");
        $stmt->bind_param("s", $room_id);

    } else {
        $stmt = $conn->prepare("SELECT * FROM bookings");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}


elseif($method == "POST"){
    // $sql = "SELECT total_price FROM rooms WHERE room_id='$input['room_id']' ";
    $stmt = $conn->prepare("SELECT price FROM rooms WHERE id = ?");

    // $room_id = $input['room_id'];

    // $stmt->bind_param("i", $room_id);
    // $stmt->bind_param("i", $input['room_id']);

    // $stmt->execute();
    // $room_price = $stmt->get_result();

    // echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    

    // $stmt = $conn->prepare("
    //     INSERT INTO bookings
    //     (user_id, room_id, check_in, check_out, total_price, status)
    //     VALUES (?, ?, ?, ?, ?, ?)
    // ");

    // $stmt->bind_param(
    //     "iissds",
    //     $input['user_id'],
    //     $input['room_id'],
    //     $input['check_in'],
    //     $input['check_out'],
    //     $input['total_price'],
    //     $input['status']
    // );

    // if($stmt->execute()){
    //     echo json_encode([
    //         "message" => "Booking berhasil ditambahkan"
    //     ]);
    // } else {
    //     echo json_encode([
    //         "message" => "Gagal booking kamar"
    //     ]);
    // }
}


elseif($method == "PUT"){

    $stmt = $conn->prepare("
        UPDATE bookings
        SET user_id = ?, room_id = ?, check_in = ?, check_out = ?, total_price = ?, status = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "iissdsi",
        $input['user_id'],
        $input['room_id'],
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

    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){
        echo json_encode([
            "message" => "Booking berhasil dihapus"
        ]);
    } else {
        echo json_encode([
            "message" => "Gagal menghapus booking"
        ]);
    }
}

?>