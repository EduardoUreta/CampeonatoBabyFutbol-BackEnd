// index.js (Cambio para CommonJS)
const express = require("express");
const cookieParser = require("cookie-parser");
const { EquiposRoutes, EstadisticasRoutes, JugadoresRoutes, PartidosRoutes, SessionsRoutes, UsuariosRoutes } = require("./routes/index.js");
const { errorHandler } = require("./middlewares/index.js");
const cors = require("cors");
const path = require("path");
const { Sequelize } = require('sequelize');
const envConfig = require('./config/config.js');  // Aquí se usa require en vez de import.

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.sendFile(path.join(process.cwd(), "public/index.html"));
});

// Crear la instancia de Sequelize
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
