import * as db from "../models/index.cjs";
import path from "path";
import { __dirname } from "../utils/__dirname.js";
import fs from "fs"

const { Equipos } = db.default;

export class EquiposController {

    static obtenerEquipos = async(req, res, next) => {
        try {
            const equipos = await Equipos.findAll();
            return res.status(200).json(equipos);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerEquipoPorId = async(req, res, next) => {
        const id = req.params.id;
        try {
            const equipo = await Equipos.findByPk(id);
            if(!equipo) return res.status(404).json({message: "Equipo No Encontrado"});

            return res.status(200).json(equipo);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearEquipo = async(req, res, next) => {
        const datos = req.body;
        let imagenURL = null;
        if (req.file) {
            imagenURL = `assets/img/${req.file.filename}`;
        }
        const datosEquipo = {
            ...datos, 
            imagen: imagenURL 
        };
        try {
            const nuevoEquipo = await Equipos.create(datosEquipo);
            return res.status(201).json({message: "Equipo Creado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarEquipo = async(req, res, next) => {
        const id = req.params.id;
        const datosEquipo = req.body;
    
        try {
            const equipo = await Equipos.findByPk(id);
            if (!equipo) return res.status(404).json({ message: "Equipo No Encontrado" });
    
            if (equipo.imagen && req.file) {
                const oldImagePath = path.join(__dirname, '..', 'public', equipo.imagen);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen antigua: ", err);
                    } else {
                        console.log("Imagen antigua eliminada");
                    }
                });
            };

            if (req.file) {
                datosEquipo.imagen = `/assets/img/${req.file.filename}`; 
            }
    
            await Equipos.update(datosEquipo, { where: { id } });
            return res.status(200).json(equipo);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    

    static eliminarEquipo = async(req, res, next) => {
        const id = req.params.id;
        try {
            const equipo = await Equipos.destroy({where: {id}});
            if(!equipo) return res.status(404).json({message: "Equipo No Encontrado"});

            if (equipo.imagen && req.file) {
                const oldImagePath = path.join(__dirname, '..', 'public', equipo.imagen);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen antigua: ", err);
                    } else {
                        console.log("Imagen antigua eliminada");
                    }
                });
            };
    
            return res.status(200).json({message: "Equipo eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    };
    
};