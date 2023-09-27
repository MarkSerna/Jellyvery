<?php
// Incluye el archivo de conexión a la base de datos
include('../connection.php');

// Obtiene los datos del nodo del cuerpo de la solicitud POST
$posX = $_POST['posX'];
$posY = $_POST['posY'];

// Prepara una consulta SQL para insertar el nodo en la base de datos
$sql = "INSERT INTO nodos (posX, posY) VALUES (?, ?)";

// Crea una sentencia preparada
if ($stmt = $mysqli->prepare($sql)) {
    // Vincula los parámetros y sus tipos
    $stmt->bind_param("ii", $posX, $posY);

    // Ejecuta la consulta
    if ($stmt->execute()) {
        echo "Nodo insertado correctamente en la base de datos.";
    } else {
        echo "Error al insertar el nodo en la base de datos: " . $stmt->error;
    }

    // Cierra la sentencia preparada
    $stmt->close();
} else {
    echo "Error en la preparación de la consulta: " . $mysqli->error;
}

// Cierra la conexión a la base de datos
$mysqli->close();
