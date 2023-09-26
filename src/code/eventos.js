$(document).ready(function () {
  const $map = $("#map"); // Captura el div con el id "map"

  // Agrega un manejador de eventos para el doble clic
  $map.on("dblclick", function (event) {
    // Verifica si el doble clic ocurrió dentro del div "map"
    console.log(click);
    if (event.target === this) {
      // Obtiene las coordenadas del doble clic relativas al div "map"
      const posX = event.clientX - $map.offset().left;
      const posY = event.clientY - $map.offset().top;

      // Crea un elemento de imagen
      const $image = $("<img>", {
        src: "../assets/images/grafos/nodo-black.png", // Ruta de la imagen
        css: {
          position: "absolute",
          left: posX + "px",
          top: posY + "px",
        },
      });

      // Agrega la imagen al div "map"
      $map.append($image);
    }
  });
});
