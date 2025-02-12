<?php
session_start();
include 'conexion.php';

$response = ['status' => 'error']; // Respuesta por defecto

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password']; // Recibimos la contraseña en texto plano

    // Validación básica de los datos
    if (empty($username) || empty($password)) {
        $response['message'] = 'Username or password cannot be empty';
        echo json_encode($response);
        exit;
    }
    
    // Consulta a la base de datos
    $sql = "SELECT username, password FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        // Comparar la contraseña (aquí deberías usar hash si la contraseña está almacenada encriptada en la BD)
        if ($password === $row['password']) {  
            $_SESSION['username'] = $username;
            $_SESSION['nombre'] = $row['username']; // Guardamos el nombre en la sesión

            $response['status'] = 'success';
            $response['message'] = 'Login successful';
            $response['username'] = $row['username']; // Enviar el nombre en la respuesta JSON
        } else {
            $response['message'] = 'Invalid password';
        }
    } else {
        $response['message'] = 'Username not found';
    }

    // Cerrar conexión
    $stmt->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response); // Devuelve la respuesta como JSON
}
?>
