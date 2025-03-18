import { Router } from "express";
import { UsuariosController } from "../controllers/index.js";

export const UsuariosRoutes = Router();

UsuariosRoutes.get("/", UsuariosController.obtenerUsuarios);
UsuariosRoutes.get("/:id", UsuariosController.obtenerUsuarioPorId);
UsuariosRoutes.post("/crear", UsuariosController.crearUsuario);
UsuariosRoutes.put("/:id", UsuariosController.actualizarUsuario);
UsuariosRoutes.delete("/:id", UsuariosController.eliminarUsuario);