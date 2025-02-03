<?php
// Establecer la conexión con la base de datos
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificar si el usuario ya existe
    $sql = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Si el usuario ya existe, retornar un error
        echo json_encode(["success" => false, "message" => "El nombre de usuario ya está en uso."]);
        exit;
    }

    // Cifrar la contraseña
    //$hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario creado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al crear el usuario."]);
    }

    $stmt->close();
    $conn->close();
}
?>
