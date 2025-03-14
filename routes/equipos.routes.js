import { Router } from "express";
import { EquiposController } from "../controllers/index.js";

export const EquiposRoutes = Router();

EquiposRoutes.get("/", EquiposController.obtenerEquipos);
EquiposRoutes.get("/:id", EquiposController.obtenerEquipoPorId);
EquiposRoutes.post("/", EquiposController.crearEquipo);
EquiposRoutes.put("/:id", EquiposController.actualizarEquipo);
EquiposRoutes.delete("/:id", EquiposController.eliminarEquipo);