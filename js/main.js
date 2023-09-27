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

function toggleSubMenu() {
  var subMenu = document.getElementById("subMenu");
  subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
}

/*===== LINK ACTIVE  =====*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  if (linkColor) {
    linkColor.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));

//========== MAPA ==========//
document.getElementById('map-container').addEventListener('click', function () {
  document.getElementById('map-overlay').style.pointerEvents = 'none';
});

document.getElementById('map-container').addEventListener('mouseleave', function () {
  document.getElementById('map-overlay').style.pointerEvents = 'auto';
});


//========== PINTAR GRAFO ==========//
document.addEventListener("DOMContentLoaded", function () {
  const map = document.getElementById("map"); // Captura la imagen con el id "map"
  const mapContainer = document.getElementById("map-container");

  // Agrega un manejador de eventos para el clic en la imagen
  map.addEventListener("click", function (event) {
    // Verifica si el clic ocurrió en la imagen "map"
    if (event.target === map) {
      // Obtiene las coordenadas del clic relativas a la imagen "map"
      const posX = event.offsetX + 215; // Ajusta la posición para centrar la imagen
      const posY = event.offsetY; // Ajusta la posición para centrar la imagen

      // Crea un elemento de imagen
      const image = document.createElement("img");
      image.src = "img/grafos/nodo-original.png"; // Ruta de la imagen
      // Modifica las dimensiones de la imagen
      image.width = 50; // Ancho deseado
      image.height = 50; // Alto deseado
      image.style.position = "absolute";
      image.style.left = (posX - image.width / 2) + "px";
      image.style.top = (posY - image.height / 2) + "px";

      // Agrega la imagen al div "map-container"
      mapContainer.appendChild(image);

      // Envia los datos del nodo al archivo PHP para inserción
      const nodeData = "Nodo de prueba"; // Reemplaza con los datos adecuados
      const nodePosX = posX;
      const nodePosY = posY;

      fetch('insert_node.php', {
        method: 'POST',
        body: JSON.stringify({ data: nodeData, posX: nodePosX, posY: nodePosY }),
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
  });
});

// Función para insertar un nodo en la base de datos
function insertNodeInDatabase(node) {
}

