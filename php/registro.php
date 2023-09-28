<?php
include ('./connection.php');

$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$clave = $_POST['clave'];

$query="INSERT INTO usuarios(nombre,correo, clave) values('$nombre','$correo', '$clave')";
    $ejecutar=mysqli_query($mysqli,$query);
    if($ejecutar){
        echo "
            <script>
                alert('usuario almacenado correctamente');
                window.location.href= '../huesped.html';
            </script>
        ";
    }

?>