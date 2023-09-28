<?php
include ('../connection.php');

$documento = $_POST['documento'];
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$clave = $_POST['clave'];

$query="INSERT INTO usuarios(documento, nombre, correo, clave) values('$documento','$nombre','$correo', '$clave')";
    $ejecutar=mysqli_query($mysqli,$query);
    if($ejecutar){
        echo "
            <script>
                alert('usuario almacenado correctamente');
                window.location.href= '../index.html';
            </script>
        ";
    }

?>