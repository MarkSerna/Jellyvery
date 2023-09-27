-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2023 a las 22:46:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jellyvery`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aristas`
--

CREATE TABLE `aristas` (
  `id` int(11) NOT NULL,
  `nodo_inicio` varchar(15) NOT NULL,
  `nodo_fin` varchar(15) NOT NULL,
  `peso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nodos`
--

CREATE TABLE `nodos` (
  `nombre` varchar(15) NOT NULL,
  `posX` int(11) DEFAULT NULL,
  `posY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `id` int(11) NOT NULL,
  `nodo_inicial` varchar(15) DEFAULT NULL,
  `nodo_final` varchar(15) DEFAULT NULL,
  `distancia` int(11) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aristas`
--
ALTER TABLE `aristas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aristas_ibfk_1` (`nodo_inicio`),
  ADD KEY `aristas_ibfk_2` (`nodo_fin`);

--
-- Indices de la tabla `nodos`
--
ALTER TABLE `nodos`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nodo_inicial` (`nodo_inicial`),
  ADD KEY `nodo_final` (`nodo_final`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aristas`
--
ALTER TABLE `aristas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aristas`
--
ALTER TABLE `aristas`
  ADD CONSTRAINT `aristas_ibfk_1` FOREIGN KEY (`nodo_inicio`) REFERENCES `nodos` (`nombre`),
  ADD CONSTRAINT `aristas_ibfk_2` FOREIGN KEY (`nodo_fin`) REFERENCES `nodos` (`nombre`);

--
-- Filtros para la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD CONSTRAINT `rutas_ibfk_1` FOREIGN KEY (`nodo_inicial`) REFERENCES `nodos` (`nombre`),
  ADD CONSTRAINT `rutas_ibfk_2` FOREIGN KEY (`nodo_final`) REFERENCES `nodos` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
