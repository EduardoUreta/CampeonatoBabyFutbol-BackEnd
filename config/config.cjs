require('dotenv').config();

const envConfig = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL, // Para producción (Railway + Neon.tech)
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Necesario para conexiones SSL en Neon.tech
        },
      },
    }
  : {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "postgres",
      JWT_SECRET: process.env.JWT_SECRET
    };

module.exports = envConfig;


// DB_HOST=localhost
// DB_DATABASE=Campeonato_BabyFutbol
// DB_USER=postgres
// DB_PASSWORD=caca1234
// JWT_SECRET=aksfj9t5yntscmao@!
