// Importa las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Crea una instancia de Express
const app = express();

// Configura el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;

// Middleware para analizar datos JSON en las solicitudes
app.use(bodyParser.json());

// Ruta para cargar datos en la base de datos
app.post('/api/upload', (req, res) => {
  // Configura la conexión a la base de datos (reemplaza con tus propios valores)
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Agrega tu contraseña si es necesaria
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

    // Verificar si "ubicaciones" está presente en los datos
    if (data.hasOwnProperty('ubicaciones')) {
      console.log('Datos de ubicaciones encontrados:', data.ubicaciones);

      // Insertar los datos de ubicaciones en la base de datos aquí
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
    }

    // ... (agrega lógica similar para conexiones y otros datos si es necesario)

    // Cierra la conexión a la base de datos
    dbConnection.end();
  });

  // En caso de éxito
  res.json({ message: 'Datos cargados correctamente' });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
