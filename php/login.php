<?php
    include ('../connection.php');
    $correo = $_POST['correo'];
    $clave = $_POST['clave'];

    $validar_login = mysqli_query("SELECT * FROM usuarios WHERE correo='$correo' and clave='$clave'");

        if(mysqli_num_rows($validar_login)>0){
            header("location:../index.html");
        } else {
            echo "
                <script>
                    alert('Acceso denegado, verifique los datos e inténtelo de nuevo');
                    window.location=('../login.html');
                </script>
            ";
        };
?>