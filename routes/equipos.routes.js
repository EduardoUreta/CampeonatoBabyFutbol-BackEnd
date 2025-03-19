import { Router } from "express";
import { EquiposController } from "../controllers/index.js";
import { uploadImagen  } from "../utils/index.js";

export const EquiposRoutes = Router();

EquiposRoutes.get("/", EquiposController.obtenerEquipos);
EquiposRoutes.get("/:id", EquiposController.obtenerEquipoPorId);
EquiposRoutes.post("/", uploadImagen.single('imagen'), EquiposController.crearEquipo);
EquiposRoutes.put("/:id", uploadImagen.single('imagen'), EquiposController.actualizarEquipo);
EquiposRoutes.delete("/:id", EquiposController.eliminarEquipo);