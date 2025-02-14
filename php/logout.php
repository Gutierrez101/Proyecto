<?php
session_start();
session_destroy(); // Cierra la sesión
header("Content-Type: application/json");
echo json_encode(['status' => 'success']);
exit;
?>
