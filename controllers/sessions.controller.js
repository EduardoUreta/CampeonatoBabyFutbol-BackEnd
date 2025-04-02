import * as db from "../models/index.cjs"
import { verifyPassword, CreateSignature } from "../utils/index.js";

const { Usuarios } = db.default;

export class SessionsController {

    static login = async(req, res, next) => {
        const { correo, contrasena } = req.body;
        try {
            const usuario = await Usuarios.findOne({where: { correo: correo }});
            if(!usuario) throw new Error("Credenciales Inválidas", { cause: "INVALID_CREDENTIALS" });

            const validPassword = await verifyPassword(contrasena, usuario.contrasena);
            if(!validPassword) throw new Error("Credenciales Inválidas", { cause: "INVALID_CREDENTIALS" });

            const signature = CreateSignature({
                _id: usuario.id,
                email: usuario.email,
                rol: usuario.rol,
                nombre: usuario.nombre
            });

            return res.cookie('Bearer', signature, {
                httpOnly: true,     // Evita acceso desde JavaScript en el frontend
                secure: true,       // Requiere HTTPS (asegúrate de usar HTTPS en .xyz)
                sameSite: 'None',   // Permite el uso en dominios distintos
                path: '/',          // Aplica la cookie a toda la aplicación
            }).json({message: "Usuario logueado"});
            

        } catch (error) {
            next(error);
        };
    };

    static logout = async(req, res, next) => {
        if(req.user){
            return res.clearCookie('Bearer').json({message: "Sesión Cerrada"});
        };
        return res.json({message: "No estás logueado para cerrar sesión"})
    };

};