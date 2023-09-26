var map = L.map("map", {
    /*zoomControl: false,
    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: false,
    dragging: false,*/
  }).setView([4.806157206689339, -75.75583403900613], 16.5);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  var popup = L.popup().setLatLng([4.806157206689339, -75.75583403900613]);
  
  var marker = L.marker([43.26271, -2.92528])
    .bindPopup(popup)
    .openPopup()
    .addTo(map);