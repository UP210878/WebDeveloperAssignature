<?php
//Conexion a la base de datos
header('Access-Control-Allow-Origin: *');

try {
    $conn = new PDO(
        "mysql:host=localhost;dbname=taskList",
        "root",
        "contra123"
    );
} catch (PDOException $e) {
    echo $e->getMessage();
};