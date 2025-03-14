import * as db from "../models/index.cjs";
const { Estadisticas_Equipo_Partido } = db.default;

export class EstadisticasController {

    static obtenerEstadisticas = async(req, res, next) => {
        try {
            const estadisticas = await Estadisticas_Equipo_Partido.findAll();
            return res.status(200).json(estadisticas);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerEstadisticaPorID = async(req, res, next) => {
        const id = req.params.id;
        try {
            const estadistica = await Estadisticas_Equipo_Partido.findByPk(id);
            if(!estadistica) return res.status(404).json({message: "Estadistica No Encontrado"});
            return res.status(200).json(estadistica);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearEstadistica = async(req, res, next) => {
        const datosNuevaEstadistica = req.body;
        try {
            const nuevaEstadistica = await Estadisticas_Equipo_Partido.create(datosNuevaEstadistica);
            return res.status(201).json({message: "Partido creado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarEstadistica = async(req, res, next) => {
        const id = req.params.id;
        const nuevosDatos = req.body;
        try {
            const estadistica = await Estadisticas_Equipo_Partido.findByPk(id);
            if(!estadistica) return res.status(404).json({message: "Estadistica No Encontrado"});

            await Estadisticas_Equipo_Partido.update(nuevosDatos, { where: {id}});
            return res.status(200).json({message: "Estadistica Actualizado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarEstadistica = async(req, res, next) => {
        const id = req.params.id;
        try {
            const estadistica = await Estadisticas_Equipo_Partido.destroy({where: {id}});
            if(!estadistica) return res.status(404).json({message: "Estadistica No Encontrad"});
    
            return res.status(200).json({message: "Estadistica eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    }; 
}