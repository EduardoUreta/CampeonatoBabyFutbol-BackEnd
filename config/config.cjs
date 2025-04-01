require('dotenv').config();

const envConfig = process.env.DATABASE_URL
  ? {
      database: process.env.DATABASE_URL, // Sequelize usa "database" en lugar de "url"
      JWT_SECRET: process.env.JWT_SECRET,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Para Neon.tech
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


