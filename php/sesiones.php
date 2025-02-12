<?php
session_start();
header('Content-Type: application/json');

$response = ['logged_in' => false];

if (isset($_SESSION['username'])) {
    $response = [
        'logged_in' => true,
        'username' => $_SESSION['username']
    ];
}

echo json_encode($response);
?>
