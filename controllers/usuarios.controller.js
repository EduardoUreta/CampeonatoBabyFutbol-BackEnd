import * as db from "../models/index.cjs";
const { Usuarios } = db.default;

export class UsuariosController {

    static obtenerUsuarios = async(req, res, next) => {
        try {
            const usuarios = await Usuarios.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerUsuarioPorId = async(req, res, next) => {
        const id = req.params.id;
        try {
            const usuario = await Usuarios.findByPk(id);
            if(!usuario) return res.status(404).json({message: "Usuario No Encontrado"});

            return res.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearUsuario = async(req, res, next) => {
        const datosUsuario = req.body;
        try {
            const nuevoUsuario = await Usuarios.create(datosUsuario);
            return res.status(201).json({message: "Usuario Creado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarUsuario = async(req, res, next) => {
        const id = req.params.id;
        const datosUsuario = req.body;
        try {
            const usuario = await Usuarios.findByPk(id);
            if(!usuario) return res.status(404).json({message: "Usuario No Encontrado"});

            await Usuarios.update(datosUsuario, { where: {id}} );
            return res.status(200).json({message: "Usuario Actualizado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarUsuario = async(req, res, next) => {
        const id = req.params.id;
        try {
            const usuario = await Usuarios.destroy({where: {id}});
            if(!usuario) return res.status(404).json({message: "Usuario No Encontrado"});
    
            return res.status(200).json({message: "Usuario eliminado"}); 
        } catch (error) {
            console.error(error);
            next(error);
        };
    };
    
};