<?php
header("Content-Type: application/json");
include "config.php";

$response = [
    "status" => "success",
    "messages" => []
];

// 1. Check if 'role' column exists in 'users' table
$check_column = mysqli_query($conn, "SHOW COLUMNS FROM users LIKE 'role'");
if (mysqli_num_rows($check_column) == 0) {
    // Add 'role' column
    $alter_query = "ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user' AFTER name";
    if (mysqli_query($conn, $alter_query)) {
        $response["messages"][] = "Added 'role' column to 'users' table.";
    } else {
        $response["status"] = "error";
        $response["messages"][] = "Failed to add 'role' column: " . mysqli_error($conn);
    }
} else {
    $response["messages"][] = "'role' column already exists in 'users' table.";
}

// 2. Set 'admin' role for Budi Santoso (id = 1)
$update_role = "UPDATE users SET role = 'admin' WHERE email = 'budi@gmail.com'";
if (mysqli_query($conn, $update_role)) {
    $response["messages"][] = "Updated Budi Santoso's role to 'admin'.";
} else {
    $response["status"] = "error";
    $response["messages"][] = "Failed to update admin role: " . mysqli_error($conn);
}

// 3. Convert plain text passwords to MD5 (if they are not already hashed)
// MD5 string length is exactly 32 characters
$update_passwords = "UPDATE users SET password = MD5(password) WHERE LENGTH(password) < 32";
if (mysqli_query($conn, $update_passwords)) {
    $affected = mysqli_affected_rows($conn);
    $response["messages"][] = "Hashed $affected plain text password(s) to MD5.";
} else {
    $response["status"] = "error";
    $response["messages"][] = "Failed to hash passwords: " . mysqli_error($conn);
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
