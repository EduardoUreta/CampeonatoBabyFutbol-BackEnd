'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const envConfig = require(__dirname + '/../config/config.cjs'); 
const db = {};

let sequelize;

if (envConfig.url) {
  sequelize = new Sequelize(envConfig.url, envConfig); 
} else {
  sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}

sequelize.authenticate()
  .then(() => console.log('Conectado a PostgreSQL en Neon.tech'))
  .catch(err => console.error('Error de conexión:', err));

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
