import { where } from "sequelize";
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
            if(!estadistica) return res.status(404).json({message: "Estadística No Encontrada"});
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
            return res.status(201).json({message: "Estadística creada"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearVariasEstadisticas = async(req, res, next) => {
        const arrayDatosNuevasEstadisticas = req.body; // Sería como [{nuevosdatos: {}}, {nuevosDatos:{}}, etc];

        try {
            if(!Array.isArray(arrayDatosNuevasEstadisticas)) return res.status(400).json({message: "Se espera un array"});

            const crearPromesas = arrayDatosNuevasEstadisticas.map(async(estadistica) => {               
                const nuevaEstadistica  = await Estadisticas_Equipo_Partido.create(estadistica);
                return nuevaEstadistica;
            });

            const ejecutarPromesas = await Promise.all(crearPromesas);
            return res.status(200).json({ message: "Estadísticas creadas", datos: ejecutarPromesas });
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
            if(!estadistica) return res.status(404).json({message: "Estadística No Encontrada"});

            await Estadisticas_Equipo_Partido.update(nuevosDatos, { where: {id}});
            return res.status(200).json({message: "Estadistica Actualizado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarVariasEstadisticas = async(req, res, next) => {
        const estadisticas = req.body; // sería como [{id, nuevosdatos}, {id, nuevosDatos}, etc];

        try {
            if(!Array.isArray(estadisticas) || estadisticas.length === 0) return res.status(400).json({message: "Se espera un array"});

            const actualizarPromesas = estadisticas.map(async(estadistica) => {
                const { id, nuevosDatos } = estadistica;

                const existeEstadistica = await Estadisticas_Equipo_Partido.findByPk(id);
                if(!existeEstadistica) return res.status(404).json({message: "Estadística No Encontrada"});

                await Estadisticas_Equipo_Partido.update(nuevosDatos, { where: {id}});
                return { id, message: "Estadistica actualizada"};
            });

            const ejecutarPromesas = await Promise.all(actualizarPromesas);
            return res.status(200).json({ message: "Actualización completada", ejecutarPromesas });

        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarEstadistica = async(req, res, next) => {
        const id = req.params.id;
        try {
            const estadistica = await Estadisticas_Equipo_Partido.destroy({where: {id}});
            if(!estadistica) return res.status(404).json({message: "Estadística No Encontrada"});
    
            return res.status(200).json({message: "Estadística eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    }; 
}