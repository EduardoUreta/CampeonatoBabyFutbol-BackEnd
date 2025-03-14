import * as db from "../models/index.cjs";
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
        const datosNuevoJugador = req.body;
        try {
            const nuevoJugador = await Jugadores.create(datosNuevoJugador);
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

            await Jugadores.update(nuevosDatos, { where: {id}});
            return res.status(200).json({message: "Jugador Actualizado"});
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
    
            return res.status(200).json({message: "Jugador eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    };
};