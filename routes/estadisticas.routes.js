import { Router } from "express";
import { EstadisticasController } from "../controllers/index.js";

export const EstadisticasRoutes = Router();

EstadisticasRoutes.get("/", EstadisticasController.obtenerEstadisticas);
EstadisticasRoutes.get("/:id", EstadisticasController.obtenerEstadisticaPorID);
EstadisticasRoutes.post("/crear", EstadisticasController.crearEstadistica);
EstadisticasRoutes.post("/crear-varias", EstadisticasController.crearVariasEstadisticas);
EstadisticasRoutes.put("/:id", EstadisticasController.actualizarEstadistica);
EstadisticasRoutes.put("/actualizar-varias", EstadisticasController.actualizarVariasEstadisticas);
EstadisticasRoutes.delete("/:id", EstadisticasController.eliminarEstadistica);
