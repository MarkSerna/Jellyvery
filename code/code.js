class Node {
  constructor(name, posX, posY) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.routes = []; // Inicializamos routes como un array vacío
  }

  // Getter para el atributo name
  getName() {
    return this.name;
  }

  // Setter para el atributo name
  setName(newName) {
    this.name = newName;
  }

  // Getter para el atributo posX
  getPosX() {
    return this.posX;
  }

  // Setter para el atributo posX
  setPosX(newPosX) {
    this.posX = newPosX;
  }

  // Getter para el atributo posY
  getPosY() {
    return this.posY;
  }

  // Setter para el atributo posY
  setPosY(newPosY) {
    this.posY = newPosY;
  }
  // Getter para el atributo routes
  getRoutes() {
    return this.routes;
  }

  // Método para agregar una arista (Arist) al array routes
  addRoute(arist) {
    this.routes.push(arist);
  }
}
class Arist {
  constructor(point, weight) {
    this.point1 = point;
    this.weight = weight;
  }

  // Getter para el atributo point1
  getPoint() {
    return this.point;
  }

  // Setter para el atributo point1
  setPoint(newPoint1) {
    this.point1 = newPoint;
  }

  // Getter para el atributo weight
  getWeight() {
    return this.weight;
  }

  // Setter para el atributo weight
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Busca y devuelve el objeto Arist que tenga el atributo weight
 * correspondiente al número más pequeño entre las aristas que
 * conectan el nodo inicial con el nodo final.
 *
 * @param {Node} NodeInitial - Nodo inicial desde el que se inicia la búsqueda.
 * @param {Node} NodeFinal - Nodo final al que se desea llegar.
 * @returns {Arist} El objeto Arist con el peso más pequeño
 * encontrado en las rutas entre los nodos. Si no se encuentra ninguna arista,
 * se devuelve null.
 */
const buscarDistanciaMinima = (NodeInitial, NodeFinal) => {
  let routes = NodeInitial.getRoutes();
  let matchingRoutes = routes.filter(
    (arist) => arist.getPoint() === NodeFinal.getName()
  );
  if (matchingRoutes.length === 0) {
    return null; // No se encontraron aristas que cumplan con el criterio.
  }
  return matchingRoutes.reduce(
    (minArist, arist) =>
      arist.getWeight() < minArist.getWeight() ? arist : minArist,
    matchingRoutes[0]
  );
};
