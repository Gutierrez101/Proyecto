<?php
include 'conexion.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $username=$_POST['username'];
    $password=password_hash($_POST['password'],PASSWORD_DEFAULT);

    $sql="INSERT INTO usuarios (username,password) VALUES (?,?)";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("ss",$username,$password);

    if($stmt->execute()){
        echo "Usuario registrado correctamente.";
    }else{
        echo "Error al registrar el usuario.";
    }

    $stmt->close();
    $conn->close();
}


?>