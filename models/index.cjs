const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('../config/config.cjs'); // Ajusta la ruta según tu configuración
const basename = path.basename(__filename);
const db = {};

// Configuración de la base de datos
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Opcional, para desactivar los logs SQL
});

// Leer los archivos de modelos y cargarlos dinámicamente
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Definir asociaciones entre modelos (si es necesario)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sincronizar la base de datos con los modelos
(async () => {
  try {
    await sequelize.sync(); // Sincroniza los modelos con la base de datos
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing the database: ', error);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
