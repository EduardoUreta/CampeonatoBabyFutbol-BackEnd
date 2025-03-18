import { Router } from "express";
import { PartidosController } from "../controllers/index.js";

export const PartidosRoutes = Router();

PartidosRoutes.get("/", PartidosController.obtenerPartidos);
PartidosRoutes.get("/:id", PartidosController.obtenerPartidoPorID);
PartidosRoutes.post("/crear", PartidosController.crearPartido);
PartidosRoutes.put("/:id", PartidosController.actualizarPartido);
PartidosRoutes.delete("/:id", PartidosController.eliminarPartido);