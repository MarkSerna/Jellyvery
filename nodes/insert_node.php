<?php
include '../conecction.php';


// Prepara una consulta SQL INSERT
$sql = "INSERT INTO nodos (data, posX, posY) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error al preparar la consulta: " . $conn->error);
}

// Vincula los parámetros y ejecuta la consulta
$stmt->bind_param("sii", $data, $posX, $posY);

if ($stmt->execute() === true) {
    echo "Nodo insertado correctamente en la base de datos";
} else {
    echo "Error al insertar el nodo en la base de datos: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
