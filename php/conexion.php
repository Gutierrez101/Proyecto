<?php
$host="localhost";
$user="root";
$password="";
$database="fusionvibes_db";


$conn=new mysqli($host,$user,$password,$database);

if($conn->connect_error){
    die("Error de conexion: ". $conn->connect_error);
}
?>