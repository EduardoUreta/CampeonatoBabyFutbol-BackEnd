import cookieParser from "cookie-parser";
import express from "express";
import { EquiposRoutes, EstadisticasRoutes, JugadoresRoutes, PartidosRoutes, SessionsRoutes, UsuariosRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/index.js";
import cors from "cors";
import path from "path";
const { Sequelize } = require('sequelize');
import { envConfig } from "./config/config.cjs";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// CORS
app.use(cors({
    origin: 'http://localhost:5173',
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

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
    host: envConfig.host,
    dialect: envConfig.dialect
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});