<?php
header("Content-Type: application/json");
include "config.php";
include "protected.php";

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if($method == "GET"){
    $jwtUser = protect();

    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("SELECT * FROM payments WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);

    } elseif (isset($_GET['booking_id'])) {
        $stmt = $conn->prepare("SELECT * FROM payments WHERE booking_id = ?");
        $stmt->bind_param("i", $_GET['booking_id']);

    } elseif (isset($_GET['status'])) {
        // $status = "%" . $_GET['status'] . "%";
        $stmt = $conn->prepare("SELECT * FROM payments WHERE status LIKE ?");
        $stmt->bind_param("s", $_GET['status'] );

    } else {
        $stmt = $conn->prepare("SELECT * FROM payments");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

elseif($method == "POST"){
    $jwtUser = protect();
    $booking_id =  $input['booking_id'] ?? null; 
    $amount =  $input['amount'] ?? null; 
    $payment_date =  $input['payment_date'] ?? null; 
    $payment_method =  $input['payment_method'] ?? null; 
    $status =  $input['status'] ?? null; 

    if (!isset($booking_id) || !isset($amount) || !isset($payment_date) || !isset($payment_method) || !isset($status) ) {
        http_response_code(400);
        echo json_encode([
            "message" => "Data tidak lengkap!",
            "status code" => http_response_code()
        ]);
        return;
    }

     $checkduplikasi = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM payments WHERE booking_id='$booking_id' "));
    if ($checkduplikasi) {
        http_response_code(403);
        echo json_encode([
            "message" => "Booking_id tidak bisa duplikat!",
            "status code" => http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("
        INSERT INTO payments
        (booking_id, amount, payment_date, payment_method, status)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "idsss",
        $input['booking_id'],
        $input['amount'],
        $input['payment_date'],
        $input['payment_method'],
        $input['status']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Payment berhasil ditambahkan"
        ]);
    } else {
        echo json_encode([
            "message" => "Gagal menambahkan payment"
        ]);
    }
}

elseif($method == "PUT"){
    $jwtUser = protect();

    $stmt = $conn->prepare("
        UPDATE payments
        SET booking_id = ?, amount = ?, payment_date = ?, payment_method = ?, status = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "idsssi",
        $input['booking_id'],
        $input['amount'],
        $input['payment_date'],
        $input['payment_method'],
        $input['status'],
        $input['id']
    );

    if($stmt->execute()){
        echo json_encode([
            "message" => "Payment berhasil diupdate"
        ]);
    } else {
        echo json_encode([
            "message" => "Gagal update payment"
        ]);
    }
}

elseif($method == "DELETE"){
    $jwtUser = protect();
    $id =  $input['id'] ?? null;

    $checkapakahada = mysqli_query($conn, "SELECT * FROM payments WHERE id='$id'");
    $numrows = mysqli_num_rows($checkapakahada);

    if (!$numrows) {
        http_response_code(403);
        echo json_encode([
            "message" => "Payments dengan $id tersebut tidak ada!",
            "status code" => http_response_code()
        ]);
        return;
    };

    $stmt = $conn->prepare("DELETE FROM payments WHERE id = ?");
    $stmt->bind_param("i", $input['id']);

    if($stmt->execute()){
        echo json_encode([
            "message" => "Payment berhasil dihapus"
        ]);
    } else {
        echo json_encode([
            "message" => "Gagal menghapus payment"
        ]);
    }
}

?>