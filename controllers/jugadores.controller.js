import * as db from "../models/index.cjs";
import path from "path";
import { __dirname } from "../utils/__dirname.js";
import fs from "fs"
const { Jugadores } = db.default;

export class JugadoresController {

    static obtenerJugadores = async(req, res, next) => {
        try {
            const jugadores = await Jugadores.findAll();
            return res.status(200).json(jugadores);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerJugadoresPorEquipo = async(req, res, next) => {
        const equipo = req.params.equipo;
        try {
            const jugadoresEquipo = await Jugadores.findAll({
                include: {
                    model: Jugadores,
                    where: { equipo_id: equipo}
                }
            });
            return res.status(200).json(jugadoresEquipo);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerJugadorPorID = async(req, res, next) => {
        const id = req.params.id;
        try {
            const jugador = await Jugadores.findByPk(id);
            if(!jugador) return res.status(404).json({message: "Jugador No Encontrado"});
            return res.status(200).json(jugador);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearJugador = async(req, res, next) => {
        const datos = req.body;
        let imagenURL = null;
        if (req.file) {
            imagenURL = `assets/img/${req.file.filename}`;
        }
        const datosJugador = {
            ...datos, 
            imagen: imagenURL 
        };
        try {
            const nuevoJugador = await Jugadores.create(datosJugador);
            return res.status(201).json({message: "Usuario creado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarJugador = async(req, res, next) => {
        const id = req.params.id;
        const nuevosDatos = req.body;
        try {
            const jugador = await Jugadores.findByPk(id);
            if(!jugador) return res.status(404).json({message: "Jugador No Encontrado"});

            if (jugador.imagen && req.file) {
                const oldImagePath = path.join(__dirname, '..', 'public', jugador.imagen);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen antigua: ", err);
                    } else {
                        console.log("Imagen antigua eliminada");
                    }
                });
            };

            if (req.file) {
                nuevosDatos.imagen = `/assets/img/${req.file.filename}`; 
            };

            if(nuevosDatos.goles){
                console.log('Vienen goles');
            }

            await Jugadores.update(nuevosDatos, { where: {id}});
            return res.status(200).json(jugador);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarJugador = async(req, res, next) => {
        const id = req.params.id;
        try {
            const jugador = await Jugadores.destroy({where: {id}});
            if(!jugador) return res.status(404).json({message: "Jugador No Encontrad"});

            if (jugador.imagen && req.file) {
                const oldImagePath = path.join(__dirname, '..', 'public', jugador.imagen);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen antigua: ", err);
                    } else {
                        console.log("Imagen antigua eliminada");
                    }
                });
            };
    
            return res.status(200).json({message: "Jugador eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    };
};