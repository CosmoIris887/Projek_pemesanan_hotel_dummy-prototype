<?php
header("Content-Type: application/json");
include "config.php";

$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET"){

    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("SELECT * FROM room_types WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
    
    } elseif (isset($_GET['name'])) {   
        $name = "%" . $_GET['name'] . "%";
        $stmt = $conn->prepare("SELECT * FROM room_types WHERE name LIKE ?");
        $stmt->bind_param("s", $name);

    } else {
        $stmt = $conn->prepare("SELECT * FROM room_types");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>