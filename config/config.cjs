// Sequelize
// require('dotenv').config() 

// const envConfig = {
//   "username": process.env.DB_USER,
//   "password": process.env.DB_PASSWORD,
//   "database": process.env.DB_DATABASE,
//   "host": process.env.DB_HOST,
//   "dialect": "postgres",
//   JWT_SECRET: process.env.JWT_SECRET
// }

// module.exports = envConfig


// DB_HOST=localhost
// DB_DATABASE=Campeonato_BabyFutbol
// DB_USER=postgres
// DB_PASSWORD=caca1234 
// JWT_SECRET=aksfj9t5yntscmao@!

import { Sequelize } from 'sequelize';

const config = {
  use_env_variable: 'DATABASE_URL', // Usamos la variable de entorno DATABASE_URL
};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Especificamos que estamos usando PostgreSQL
  protocol: 'postgres', // Para garantizar la compatibilidad con Neon
  logging: false, // Puedes cambiar esto a `true` si deseas ver las consultas SQL
});

export default sequelize;
