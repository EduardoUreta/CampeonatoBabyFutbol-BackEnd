require('dotenv').config();

const envConfig = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL, // Sequelize usará esta URL completa para conectarse
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Para Neon.tech
        },
      },
      JWT_SECRET: process.env.JWT_SECRET
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



