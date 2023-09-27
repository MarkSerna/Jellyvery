const fs = require('fs'); // Módulo de manejo de archivos
const mysql = require('mysql'); // Módulo para la conexión a MySQL

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jellyvery'
});

// Conecta a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});

// Carga el archivo JSON
const jsonData = fs.readFileSync('datos.json', 'utf-8');
const data = JSON.parse(jsonData);

// Inserta los nodos (ubicaciones)
data.ubicaciones.forEach(ubicacion => {
    const { nombre, posX, posY } = ubicacion;
    const insertQuery = `INSERT INTO nodos (nombre, posX, posY) VALUES (?, ?, ?)`;
    connection.query(insertQuery, [nombre, posX, posY], (err, result) => {
        if (err) {
            console.error('Error al insertar nodo: ' + err);
        } else {
            console.log('Nodo insertado correctamente. ID: ' + result.insertId);
        }
    });
});

// Obtiene el ID del nodo de inicio
const inicioNombre = data.inicio;
const selectInicioQuery = `SELECT id FROM nodos WHERE nombre = ?`;
connection.query(selectInicioQuery, [inicioNombre], (err, results) => {
    if (err) {
        console.error('Error al obtener el ID del nodo de inicio: ' + err);
    } else {
        const nodoInicioID = results[0].id;

        // Inserta las conexiones
        data.conexiones.forEach(conexion => {
            const { ubicacion1, ubicacion2, peso } = conexion;
            const insertConexionQuery = `INSERT INTO aristas (nodo_inicio, nodo_fin, peso) 
        VALUES (?, (SELECT id FROM nodos WHERE nombre = ?), ?)`;
            connection.query(
                insertConexionQuery,
                [nodoInicioID, ubicacion2, peso],
                (err, result) => {
                    if (err) {
                        console.error('Error al insertar conexión: ' + err);
                    } else {
                        console.log('Conexión insertada correctamente. ID: ' + result.insertId);
                    }
                }
            );
        });
    }
});

// Cierra la conexión
connection.end(err => {
    if (err) {
        console.error('Error al cerrar la conexión: ' + err);
    } else {
        console.log('Proceso completado. Conexión cerrada.');
    }
});
