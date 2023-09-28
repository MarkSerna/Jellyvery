// Importa las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');

// Crea una instancia de Express
const app = express();

// Configura el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;

// Middleware para analizar datos JSON en las solicitudes
app.use(bodyParser.json());

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

// Agrega esto antes de tus rutas
app.use(express.static('public'));

// Ruta para cargar datos en la base de datos
app.post('/api/upload', (req, res) => {
    // Aquí deberás agregar la lógica para cargar los datos en tu base de datos MySQL.
    // Puedes acceder a los datos JSON enviados desde el navegador utilizando req.body.
    // Por ejemplo, si estás utilizando el paquete mysql2 para interactuar con MySQL:

    const mysql = require('mysql2');

    // Configura la conexión a la base de datos (reemplaza con tus propios valores)
    const dbConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jellyvery',
    });

    // Conecta a la base de datos
    dbConnection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ' + err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        // Los datos JSON enviados desde el navegador estarán disponibles en req.body
        const data = req.body;

        // código para insertar los datos en tu base de datos MySQL
        // Insertar nodos en la tabla 'nodos'
        data.ubicaciones.forEach(ubicacion => {
            const { nombre, posX, posY } = ubicacion;
            const insertNodoQuery = 'INSERT INTO nodos (nombre, posX, posY) VALUES (?, ?, ?)';
            const valuesNodo = [nombre, posX, posY];

            dbConnection.query(insertNodoQuery, valuesNodo, (err, result) => {
                if (err) {
                    console.error('Error al insertar nodo en la base de datos: ' + err);
                } else {
                    console.log('Nodo insertado correctamente. ID: ' + result.insertId);
                }
            });
        });

        // Insertar aristas en la tabla 'aristas'
        data.conexiones.forEach(conexion => {
            const { ubicacion1, ubicacion2, peso } = conexion;
            const insertAristaQuery = 'INSERT INTO aristas (nodo_inicio, nodo_fin, peso) VALUES (?, ?, ?)';
            const valuesArista = [ubicacion1, ubicacion2, peso];

            dbConnection.query(insertAristaQuery, valuesArista, (err, result) => {
                if (err) {
                    console.error('Error al insertar arista en la base de datos: ' + err);
                } else {
                    console.log('Arista insertada correctamente. ID: ' + result.insertId);
                }
            });
        });
        if (errorOcurred) {
            console.error('Error al procesar la solicitud: ' + error);
            res.status(500).json({ error: 'Error interno del servidor' }); // Enviar una respuesta JSON de error
            return;
        }
        // En caso de éxito
        res.json({ message: 'Datos cargados correctamente' }); // Enviar una respuesta JSON exitosa

    });



    // Cierra la conexión a la base de datos
    dbConnection.end();
});







