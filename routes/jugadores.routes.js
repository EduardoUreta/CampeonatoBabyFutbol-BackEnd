import { Router } from "express";
import { JugadoresController } from "../controllers/index.js";
import { uploadImagen } from "../utils/multer.js";

export const JugadoresRoutes = Router();

JugadoresRoutes.get("/", JugadoresController.obtenerJugadores);
JugadoresRoutes.get("/:id", JugadoresController.obtenerJugadorPorID);
JugadoresRoutes.get("/equipo/:id", JugadoresController.obtenerJugadoresPorEquipo);
JugadoresRoutes.post("/crear", uploadImagen.single('imagen'), JugadoresController.crearJugador);
JugadoresRoutes.put("/:id", uploadImagen.single('imagen'), JugadoresController.actualizarJugador);
JugadoresRoutes.delete("/:id", JugadoresController.eliminarJugador);