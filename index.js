import cookieParser from "cookie-parser";
import express from "express";
import { EquiposRoutes, JugadoresRoutes } from "./routes/index.js";
// import { errorHandler } from "./middlewares/index.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.use(errorHandler);

app.use("/api/jugador", JugadoresRoutes);
app.use("/api/equipo", EquiposRoutes);

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});