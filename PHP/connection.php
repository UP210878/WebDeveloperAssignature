<?php
//Conexion a la base de datos
include './partials/connection.php';


try {
    $state = $conn->query("SELECT * FROM users;");
    // $row = $state->fetch();
    // echo $state;
    // var_dump($row);
    // echo $row[0];
    $json = [];
    while ($row = $state->fetch()) {
        array_push($json, [
            "id" => $row['id'],
            "firstname" => $row['firstname'],
            "lastname" => $row['lastname'],
            "email" => $row['email']
        ]);
        // echo $row['id'] . "<br>";
    };
    header('Access-Control-Allow-Origin: *');

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    echo $e->getMessage();
}