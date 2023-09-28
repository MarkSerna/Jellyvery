/*===== SHOW NAVBAR  =====*/
/* const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId);

  // Validate that all variables exist
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      // show navbar
      nav.classList.toggle("show");
      // change icon
      toggle.classList.toggle("bx-x");
      // add padding to body
      bodypd.classList.toggle("body-pd");
      // add padding to header
      headerpd.classList.toggle("body-pd");
    });
  }
};

showNavbar("header-toggle", "nav-bar", "body-pd", "header"); */

/*===== SUBMENU  =====*/
/**
 * Alternar la visibilidad del submenú haciendo que aparezca o desaparezca.
 * Esta función se utiliza comúnmente en elementos de menú desplegable.
 */


// /*===== LINK ACTIVE  =====*/
// const linkColor = document.querySelectorAll(".nav__link");

// function colorLink() {
//   if (linkColor) {
//     linkColor.forEach((l) => l.classList.remove("active"));
//     this.classList.add("active");
//   }
// }
// linkColor.forEach((l) => l.addEventListener("click", colorLink));

//========== MENSAJE ARCHIVOS ==========//

function onFileChange(event) {
  var fileName = event.target.files[0].name;
  var reader = new FileReader();
  reader.onload = function (e) {
    var obj = JSON.parse(e.target.result);
    displayData(obj, fileName);
  };
  reader.readAsText(event.target.files[0]);
}

document.getElementById('file').addEventListener('change', onFileChange);

//Mostrar los mensajes en el sidebar
function displayData(data, fileName) {
  // Selecciona el elemento div
  var nameElement = document.getElementById('nombre');
  nameElement.style.color = 'white';

  // Reemplaza el texto en el elemento div con el nombre del archivo
  nameElement.textContent = fileName;

  // Verifica si data es un array
  if (!Array.isArray(data)) {
    // Si data es un objeto, conviértelo en un array de objetos
    data = Object.values(data);
    console.log(data);
  }
  // Crea un nuevo elemento de lista para los datos del archivo
  var fileDataItem = document.createElement('li');
  
  // Itera sobre cada objeto en los datos del archivo
  data.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = 'Nombre: ' + item.nombre + ', posX: ' + item.posX + ', posY: ' + item.posY;
      li.style.fontSize = '12px';
      li.style.color = 'white';
      fileDataItem.appendChild(li);
      li.textContent = item;
  });


  // Agrega el elemento de la lista debajo del elemento div
  nameElement.parentNode.insertBefore(fileDataItem, nameElement.nextSibling);
}

//========== FIN MENSAJE ARCHIVOS ==========//


/**
 * Espera a que el contenido del documento HTML esté completamente cargado y luego
 * agrega un manejador de eventos para el clic en la imagen del mapa.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Captura el elemento de la imagen del mapa y el contenedor del mapa
  const map = document.getElementById("map");
  const mapContainer = document.getElementById("map-container");
  const fileInput = document.getElementById("file");


  /**
   * Maneja el evento de clic en la imagen del mapa.
   * @param {Event} event - El objeto de evento de clic.
   */
  map.addEventListener("click", ({ target, offsetX, offsetY }) => {
    // Verifica si el clic ocurrió en la imagen del mapa
    if (target === map) {
      // Calcula las coordenadas del clic relativas a la imagen del mapa
      const posX = offsetX + 230; // Ajusta la posición para centrar la imagen
      const posY = offsetY; // Ajusta la posición para centrar la imagen
      // Cargar los nodos desde un archivo JSON
      fetch('nodes.json')
        .then(response => response.json())
        .then(data => {
          // Procesar los datos y crear nodos
          data.nodes.forEach(nodeData => {
            createNode(nodeData.posX, nodeData.posY);
          });
        })
        .catch(error => {
          console.error('Error al cargar los nodos desde el archivo JSON: ' + error);
        });o
      // Llama a la función para crear un nodo con los datos y coordenadas proporcionados
      createNode(posX, posY);
    }
    // Manejador de eventos para el input file
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0]; // Obtiene el archivo seleccionado

      if (file) {
        // Verifica que se haya seleccionado un archivo
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            // Procesa los datos y crea los nodos según el archivo JSON
            data.nodes.forEach((nodeData) => {
              // Llama a la función para crear un nodo con los datos y coordenadas proporcionados
              createNode(nodeData.posX, nodeData.posY);
            });
          } catch (error) {
            console.error('Error al procesar el archivo JSON: ' + error);
          }
        };

        // Lee el contenido del archivo como texto
        reader.readAsText(file);
      }
    });
  });
});
/**
 * Crea un nodo de imagen y lo inserta en el mapa.
 * @param {number} posX - La posición en el eje X.
 * @param {number} posY - La posición en el eje Y.
 */
function createNode(posX, posY) {
  // Crea un elemento de imagen
  const image = document.createElement("img");
  const imageSrc = "./img/grafos/nodo-original.png";
  const imageWidth = 50; // Ancho deseado
  const imageHeight = 50; // Alto deseado

  // Establece las propiedades de la imagen
  image.src = imageSrc;
  image.width = imageWidth;
  image.height = imageHeight;
  image.style.position = "absolute";
  image.style.left = `${posX - imageWidth / 2}px`; // Ajusta la posición en el eje X
  image.style.top = `${posY - imageHeight / 2}px`; // Ajusta la posición en el eje Y

  // Agrega la imagen al contenedor del mapa
  const mapContainer = document.getElementById("map-container");
  mapContainer.appendChild(image);
}
function uploadDataToDatabase(data) {
  // Requiere tu archivo connection.php
  const { connection } = require_once('../connection.php');

  // Inserta los nodos (ubicaciones)
  data.ubicaciones.forEach(ubicacion => {
    const { nombre, posX, posY } = ubicacion;
    const insertNodoQuery = 'INSERT INTO nodos (nombre, posX, posY) VALUES (?, ?, ?)';

    connection.query(insertNodoQuery, [nombre, posX, posY], (err, result) => {
      if (err) {
        console.error('Error al insertar nodo: ' + err);
      } else {
        console.log('Nodo insertado correctamente. ID: ' + result.insertId);
      }
    });
  });

  // Inserta las aristas (conexiones)
  data.conexiones.forEach(conexion => {
    const { ubicacion1, ubicacion2, peso } = conexion;
    const insertAristaQuery = `
      INSERT INTO aristas (nodo_inicio, nodo_fin, peso)
      SELECT n1.id, n2.id, ? FROM nodos n1, nodos n2
      WHERE n1.nombre = ? AND n2.nombre = ?
    `;

    connection.query(
      insertAristaQuery,
      [peso, ubicacion1, ubicacion2],
      (err, result) => {
        if (err) {
          console.error('Error al insertar arista: ' + err);
        } else {
          console.log('Arista insertada correctamente. ID: ' + result.insertId);
        }
      }
    );
  });

  // Cierra la conexión
  connection.end(err => {
    if (err) {
      console.error('Error al cerrar la conexión: ' + err);
    } else {
      console.log('Proceso completado. Conexión cerrada.');
    }
  });
}






