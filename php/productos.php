<?php
header("Content-Type: application/json");
$conexion = new mysqli("localhost", "root", "", "fusionvibes_db");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
}

$sql = "SELECT id, nombre, precio, imagen, modelo FROM productos";
$resultado = $conexion->query($sql);

$productos = [];

while ($fila = $resultado->fetch_assoc()) {
    $productos[] = $fila;
}

echo json_encode($productos);
$conexion->close();
?>
