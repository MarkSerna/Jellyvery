class Node {
  constructor(posX, posY) {
    this.posX = posX; // Posición en el eje X
    this.posY = posY; // Posición en el eje Y
    this.neighbors = new Map(); // Mapa para almacenar nodos vecinos y pesos de las aristas
  }

  // Getter para obtener la posición en el eje X
  getPosX() {
    return this.posX;
  }

  // Setter para establecer la posición en el eje X
  setPosX(newPosX) {
    this.posX = newPosX;
  }

  // Getter para obtener la posición en el eje Y
  getPosY() {
    return this.posY;
  }

  // Setter para establecer la posición en el eje Y
  setPosY(newPosY) {
    this.posY = newPosY;
  }
  // Método para agregar una arista bidireccional a otro nodo
  addNeighbor(node, weight) {
    this.neighbors.set(node, weight);
    node.neighbors.set(this, weight); // Conexión bidireccional
  }

  // Método para obtener los nodos vecinos y sus pesos
  getNeighbors() {
    return this.neighbors;
  }
}
class Graph {
  constructor() {
    this.nodes = new Map(); // Mapa para almacenar los nodos del grafo
  }

  // Método para agregar un nodo al grafo
  addNode(data) {
    const newNode = new Node(data);
    this.nodes.set(data, newNode);
    return newNode;
  }

  // Método para obtener un nodo por su valor (data)
  getNode(data) {
    return this.nodes.get(data);
  }

  // Método para agregar una arista bidireccional entre dos nodos
  addEdge(nodeA, nodeB, weight) {
    if (!nodeA || !nodeB) {
      throw new Error("Ambos nodos deben existir en el grafo.");
    }
    nodeA.addNeighbor(nodeB, weight);
  }

  // Método para obtener todos los nodos del grafo
  getNodes() {
    return this.nodes.values();
  }
}
export { Node, Graph };
