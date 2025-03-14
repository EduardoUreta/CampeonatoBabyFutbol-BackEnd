import cookieParser from "cookie-parser";
import express from "express";
// import { errorHandler } from "./middlewares/index.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});