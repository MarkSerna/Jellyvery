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
  reader.onload = function(e) {
      var obj = JSON.parse(e.target.result);
      displayData(obj, fileName);
  };
  reader.readAsText(event.target.files[0]);
}

document.getElementById('file').addEventListener('change', onFileChange);

//Mostrar los mensajes en el sidebar
function displayData(data, fileName) {
  // Selecciona el elemento div
  var nameElement = document.getElementById('Nombre');
  nameElement.style.color = 'white';

  // Reemplaza el texto en el elemento div con el nombre del archivo
  nameElement.textContent = fileName;

  // Crea un nuevo elemento de lista para los datos del archivo
  var fileDataItem = document.createElement('li');
  fileDataItem.textContent = JSON.stringify(data);
  fileDataItem.style.fontSize = '12px';
  fileDataItem.style.color = 'white';

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
        });
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

  // Crea un objeto nodo con las coordenadas
  const node = new Node(posX, posY);

  // Envia los datos del nodo al archivo PHP para inserción en la base de datos
  sendNodeToDatabase(node);
}
/**
 * Envía las coordenadas del nodo al archivo PHP para inserción en la base de datos.
 * @param {number} posX - La posición en el eje X.
 * @param {number} posY - La posición en el eje Y.
 */
function sendNodeToDatabase(posX, posY) {
  // Crea un objeto con las coordenadas del nodo
  const nodeData = { posX, posY };

  // Envia los datos del nodo al archivo PHP para inserción
  fetch('../nodes/insert_node.php', {
    method: 'POST',
    body: JSON.stringify(nodeData), // Solo envía las coordenadas
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error('Error al insertar el nodo en la base de datos: ' + error);
    });
}





