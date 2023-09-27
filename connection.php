<?php
// Datos de conexión a la base de datos
$hostname = "localhost"; // Cambia esto si tu servidor de base de datos no se encuentra en localhost
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos (en este ejemplo no hay contraseña)
$database = "jellyvery"; // Nombre de la base de datos

// Intenta establecer una conexión a la base de datos
$mysqli = new mysqli($hostname, $username, $password, $database);

// Verifica si la conexión tuvo éxito
if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}
