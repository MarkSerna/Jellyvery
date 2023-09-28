// Importa las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');

// Crea una instancia de Express
const app = express();

// Configura el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;

// Middleware para analizar datos JSON en las solicitudes
app.use(bodyParser.json());

// Ruta de ejemplo para la API
app.get('/api', (req, res) => {
    res.json({ message: '¡API en funcionamiento!' });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});



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
  
      // Aquí deberás escribir el código para insertar los datos en tu base de datos MySQL
      // Utiliza las funciones de mysql2 para ejecutar la consulta de inserción
  
      // Ejemplo:
      const insertQuery = 'INSERT INTO tu_tabla (campo1, campo2, campo3) VALUES (?, ?, ?)';
      const values = [data.campo1, data.campo2, data.campo3];
  
      dbConnection.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error al insertar datos en la base de datos: ' + err);
          res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
        } else {
          console.log('Datos insertados correctamente. ID: ' + result.insertId);
          res.status(200).json({ message: 'Datos insertados correctamente' });
        }
  
        // Cierra la conexión a la base de datos
        dbConnection.end();
      });
    });
  });
  
  // ...
  
