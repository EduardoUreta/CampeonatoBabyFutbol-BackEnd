// Sequelize
require('dotenv').config() 

const envConfig = {
  "username": process.env.PGUSER,
  "password": process.env.PGPASSWORD,
  "database": process.env.PGDATABASE,
  "host": process.env.PGHOST,
  "dialect": "postgres",
  JWT_SECRET: process.env.JWT_SECRET
} 

module.exports = envConfig