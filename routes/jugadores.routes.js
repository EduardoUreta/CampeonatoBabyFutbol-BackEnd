import { Router } from "express";
import { JugadoresController } from "../controllers/index.js";

export const JugadoresRoutes = Router();

JugadoresRoutes.get("/", JugadoresController.obtenerJugadores);
JugadoresRoutes.get("/:id", JugadoresController.obtenerJugadorPorID);
JugadoresRoutes.get("/equipo/:id", JugadoresController.obtenerJugadoresPorEquipo);
JugadoresRoutes.post("/crear", JugadoresController.crearJugador);
JugadoresRoutes.put("/:id", JugadoresController.actualizarJugador);
JugadoresRoutes.delete("/:id", JugadoresController.eliminarJugador);