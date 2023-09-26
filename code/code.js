import { Node, Graph } from "./instancias.js";
/**
 * Encuentra el nodo no visitado con la menor distancia actual en un grafo.
 *
 * @param {Map} distancia - Mapa que almacena la distancia actual a cada nodo.
 * @param {Set} visitados - Conjunto que almacena los nodos ya visitados.
 * @returns {any} El nodo no visitado con la menor distancia actual.
 */
function encontrarNodoMinimo(distancia, visitados) {
  // Obtener todas las entradas del mapa de distancia, filtrar por nodos no visitados y encontrar el mínimo.
  return [...distancia.entries()]
    .filter(([nodo]) => !visitados.has(nodo))
    .reduce(
      (min, entry) => (entry[1] < min[1] ? entry : min),
      [null, Infinity]
    )[0];
}

/**
 * Actualiza las distancias a los vecinos no visitados de un nodo en un grafo ponderado.
 *
 * @param {Graph} grafo - El grafo en el que se realiza la actualización.
 * @param {Node} nodoActual - El nodo actual desde el que se actualizan las distancias.
 * @param {Map} distancia - Mapa que almacena la distancia actual a cada nodo.
 * @param {Map} predecesores - Mapa que almacena los predecesores en el camino mínimo.
 * @param {Set} visitados - Conjunto que almacena los nodos ya visitados.
 */
function actualizarDistancias(
  grafo,
  nodoActual,
  distancia,
  predecesores,
  visitados
) {
  for (let [vecino, peso] of nodoActual.getNeighbors()) {
    if (!visitados.has(vecino)) {
      // Calcular la distancia acumulada desde el nodo actual al vecino
      let distanciaAcumulada = distancia.get(nodoActual) + peso;

      // Verificar si la nueva distancia es menor que la distancia almacenada
      if (distanciaAcumulada < distancia.get(vecino)) {
        // Actualizar la distancia y el predecesor para el vecino
        distancia.set(vecino, distanciaAcumulada);
        predecesores.set(vecino, nodoActual);
      }
    }
  }
}

/**
 * Encuentra la distancia mínima y el camino óptimo desde un nodo inicial a todos los demás nodos en un grafo ponderado.
 *
 * @param {Graph} grafo - El grafo en el que se busca la distancia mínima.
 * @param {Node} nodoInicial - El nodo de partida para el cálculo de la distancia mínima.
 * @returns {Map} Un mapa que contiene la distancia mínima y el camino óptimo desde el nodo inicial a cada otro nodo del grafo.
 */
function buscarDistanciaMinima(grafo, nodoInicial) {
  let distancia = new Map();
  let visitados = new Set();
  let predecesores = new Map();

  // Inicializar distancias y predecesores
  for (let nodo of grafo.getNodes()) {
    distancia.set(nodo, Infinity);
    predecesores.set(nodo, null);
  }
  distancia.set(nodoInicial, 0);

  // Calcular distancias mínimas utilizando el algoritmo de Dijkstra
  while (visitados.size < grafo.getNodes().length) {
    let nodoActual = encontrarNodoMinimo(distancia, visitados);
    visitados.add(nodoActual);
    actualizarDistancias(grafo, nodoActual, distancia, predecesores, visitados);
  }

  // Construir y devolver el mapa de camino óptimo
  let caminoOptimo = new Map();
  for (let nodo of grafo.getNodes()) {
    if (nodo !== nodoInicial) {
      let ruta = [];
      let nodoActual = nodo;
      while (nodoActual !== null) {
        ruta.unshift(nodoActual);
        nodoActual = predecesores.get(nodoActual);
      }
      caminoOptimo.set(nodo, ruta);
    }
  }

  return caminoOptimo;
}
