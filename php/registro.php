<?php
include ('../connection.php');

$documento = $_POST['documento'];
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$clave = $_POST['clave'];

$query = "SELECT * FROM usuarios WHERE documento = '$documento' AND clave = '$clave'";
$resultado = mysqli_query($mysqli, $query);

// Si mysqli_num_rows devuelve más de 0, significa que ya existe un usuario con ese nombre y contraseña
if (mysqli_num_rows($resultado) > 0) {
    echo "
        <script>
            alert('El usuario ya está registrado, verifica los datos e inténtalo de nuevo');
            window.location.href= '../login.html';
        </script>
    ";
} else {
    // Si el usuario no está registrado, entonces procede a insertarlo en la base de datos
    $query="INSERT INTO usuarios(documento, nombre, correo, clave) values('$documento','$nombre','$correo', '$clave')";
    $ejecutar=mysqli_query($mysqli,$query);
    if($ejecutar){
        echo "
            <script>
                alert('usuario almacenado correctamente');
                window.location.href= '../login.html';
            </script>
        ";
    }
}

?>