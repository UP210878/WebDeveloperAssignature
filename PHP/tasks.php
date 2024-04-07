<?php
//Conexion a la base de datos
include './partials/connection.php';

try {
    $sql = "SELECT * FROM task;";
    $state = $conn->query($sql);
    $json = [];
    while ($row = $state->fetch()) {
        $json[] = [
            'id' => $row['id'],
            'idUser' => $row['idUser'],
            'title' => $row['title'],
            'completed' => $row['completed'] == 1
        ];
    };

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    echo $e->getMessage();
}