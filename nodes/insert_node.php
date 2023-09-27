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

    // Verifica si la inserción fue exitosa
    if ($stmt->execute()) {
        // Prepara una respuesta JSON con los valores posX y posY
        $response = array(
            'success' => true,
            'posX' => $posX,
            'posY' => $posY
        );

        // Devuelve la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit(); // Termina el script para evitar la ejecución de más código
    } else {
        echo "Error al insertar el nodo en la base de datos: " . $stmt->error;
    }

    // Cierra la sentencia preparada
    $stmt->close();
} else {
    echo "Error en la preparación de la consulta: " . $mysqli->error;
}
?>
