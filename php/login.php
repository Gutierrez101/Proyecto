<?php
session_start();
include 'conexion.php';

$response = ['status' => 'error']; // Respuesta por defecto

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password']; // Este será el hash enviado desde el cliente

    // Validación básica de los datos
    if (empty($username) || empty($password)) {
        $response['message'] = 'Username or password cannot be empty';
        echo json_encode($response);
        exit;
    }
    
    // Consulta a la base de datos
    $sql = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        // Comparar la contraseña cifrada con el almacenado en la base de datos
        if ($password === $row['password']) {
            $_SESSION['username'] = $username;
            $response['status'] = 'success';
            $response['message'] = 'Login successful';
        } else {
            $response['message'] = 'Invalid password';
        }
    } else {
        $response['message'] = 'Username not found';
    }

    // Cerrar conexión
    $stmt->close();
    $conn->close();

    echo json_encode($response); // Devuelve la respuesta como JSON
}
?>
