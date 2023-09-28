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
    // Llama a la función para crear un nodo con los datos y coordenadas proporcionados
    createNode(posX, posY);
  }
});

/**
 * Manejador de eventos para el input file
 */
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
  
    if (file) {
      // Verifica que se haya seleccionado un archivo
      const reader = new FileReader();
  
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          // Verifica si las propiedades 'ubicaciones', 'conexiones' e 'inicio' existen en el objeto 'data'
          if (data && data.ubicaciones && data.conexiones && data.inicio) {
            // Procesa los datos de ubicaciones y conexiones según el archivo JSON
            data.ubicaciones.forEach((ubicacion) => {
              // Llama a la función para crear un nodo con los datos y coordenadas proporcionados
              createNode(ubicacion.posX, ubicacion.posY);
            });
  
            data.conexiones.forEach((conexion) => {
              // Aquí puedes realizar la lógica para manejar las conexiones
              // Por ejemplo, puedes crear enlaces entre los nodos correspondientes
              // usando la información en 'conexion'
            });
  
            // Llama a la función para iniciar desde la ubicación especificada
            iniciarDesdeUbicacion(data.inicio);
          } else {
            console.error("El archivo JSON no contiene las propiedades esperadas.");
          }
        } catch (error) {
          console.error("Error al procesar el archivo JSON: " + error);
        }
      };
  
      // Lee el contenido del archivo como texto
      reader.readAsText(file);
    }
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
