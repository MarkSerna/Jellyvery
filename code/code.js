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
  constructor(point1, point2, weight) {
    this.point1 = point1;
    this.point2 = point2;
    this.weight = weight;
  }

  // Getter para el atributo point1
  getPoint1() {
    return this.point1;
  }

  // Setter para el atributo point1
  setPoint1(newPoint1) {
    this.point1 = newPoint1;
  }

  // Getter para el atributo point2
  getPoint2() {
    return this.point2;
  }

  // Setter para el atributo point2
  setPoint2(newPoint2) {
    this.point2 = newPoint2;
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

function dijkstraShortestPath(initialNode) {
    const distances = {};
    const previous = {};
    const unvisitedNodes = new Set();
  
    // Inicializa las distancias y los nodos previos
    for (const node of Object.keys(nodes)) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisitedNodes.add(node);
    }
  
    distances[initialNode] = 0;
  
    while (unvisitedNodes.size > 0) {
      let currentNode = null;
      for (const node of unvisitedNodes) {
        if (!currentNode || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }
  
      unvisitedNodes.delete(currentNode);
  
      for (const route of nodes[currentNode].routes) {
        const neighbor = route.point2;
        const weight = route.weight;
        const tentativeDistance = distances[currentNode] + weight;
        if (tentativeDistance < distances[neighbor]) {
          distances[neighbor] = tentativeDistance;
          previous[neighbor] = currentNode;
        }
      }
    }
  
    function buildPath(targetNode) {
      const path = [];
      let currentNode = targetNode;
      while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
      }
      return path;
    }
  
    return { distances, buildPath };
  }
  
  // Ejemplo de uso
  const nodeA = new Node("A", 0, 0);
  const nodeB = new Node("B", 1, 1);
  const nodeC = new Node("C", 2, 2);
  
  const aristaAB = new Arist("A", "B", 5);
  const aristaAC = new Arist("A", "C", 10);
  const aristaBC = new Arist("B", "C", 2);
  
  nodeA.addRoute(aristaAB);
  nodeA.addRoute(aristaAC);
  nodeB.addRoute(aristaBC);
  
  const nodes = {
    A: nodeA,
    B: nodeB,
    C: nodeC,
  };
  