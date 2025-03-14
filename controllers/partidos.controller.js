import * as db from "../models/index.cjs";
const { Partidos } = db.default;

export class PartidosController {

    static obtenerPartidos = async(req, res, next) => {
        try {
            const partidos = await Partidos.findAll();
            return res.status(200).json(partidos);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerPartidoPorID = async(req, res, next) => {
        const id = req.params.id;
        try {
            const partido = await Partidos.findByPk(id);
            if(!partido) return res.status(404).json({message: "Partido No Encontrado"});
            return res.status(200).json(partido);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearPartido = async(req, res, next) => {
        const datosNuevoPartido = req.body;
        try {
            const nuevoPartido = await Partidos.create(datosNuevoPartido);
            return res.status(201).json({message: "Partido creado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarPartido = async(req, res, next) => {
        const id = req.params.id;
        const nuevosDatos = req.body;
        try {
            const partido = await Partidos.findByPk(id);
            if(!partido) return res.status(404).json({message: "Partido No Encontrado"});

            await Partidos.update(nuevosDatos, { where: {id}});
            return res.status(200).json({message: "Partido Actualizado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarPartido = async(req, res, next) => {
        const id = req.params.id;
        try {
            const partido = await Partidos.destroy({where: {id}});
            if(!partido) return res.status(404).json({message: "Partido No Encontrad"});
    
            return res.status(200).json({message: "Partido eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    }; 
}