import cookieParser from "cookie-parser";
import express from "express";
import { EquiposRoutes, EstadisticasRoutes, JugadoresRoutes, PartidosRoutes, SessionsRoutes, UsuariosRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/index.js";
import cors from "cors";
import path from "path";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// CORS
app.use(cors({
    origin: ['https://campeonatobabyfutbol-backend-production.up.railway.app/', 'http://campeonatobabyhoy.xyz'],
    credentials: true, 
}));

app.use("/api/jugador", JugadoresRoutes);
app.use("/api/equipo", EquiposRoutes);
app.use("/api/partido", PartidosRoutes);
app.use("/api/estadistica", EstadisticasRoutes);
app.use("/api/usuario", UsuariosRoutes);
app.use("/api/auth", SessionsRoutes);

app.use(errorHandler);

app.use("/*", (req, res) => {
    res.sendFile(path.join(process.cwd(),"public/index.html"));
});


app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});