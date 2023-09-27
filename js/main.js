/*===== SHOW NAVBAR  =====*/
const showNavbar = (toggleId, navId, bodyId, headerId) => {
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

showNavbar("header-toggle", "nav-bar", "body-pd", "header");

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
//Create map object
var map = L.map("map", {
  doubleClickZoom: false,
  /*zoomControl: false,
  scrollWheelZoom: false,
  touchZoom: false,
  dragging: false,*/
}).setView([4.806157206689339, -75.75583403900613], 16.5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var popup = L.popup().setLatLng([4.806157206689339, -75.75583403900613]);

/* var marker = L.marker([4.806157206689339, -75.75583403900613])
  .bindPopup(popup)
  .openPopup()
  .addTo(map);*/

//========== PINTAR GRAFO ==========//
document.addEventListener("DOMContentLoaded", function () {
  const map = document.getElementById("map"); // Captura la imagen con el id "map"
  const mapContainer = document.getElementById("map-container");

  // Agrega un manejador de eventos para el clic en la imagen
  map.addEventListener("click", function (event) {
    // Verifica si el clic ocurrió en la imagen "map"
    if (event.target === map) {
      // Obtiene las coordenadas del clic relativas a la imagen "map"
      const posX = event.offsetX+100; // Ajusta la posición para centrar la imagen
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

      //crea un Nodo
      let nodo = new Node(posX , posY );
    }
  });
});


