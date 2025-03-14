'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Jugadores } = models;

      this.hasMany(Jugadores);
    }
  }
  Equipos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ganados: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 6
      },
      defaultValue: 0
    },
    empatados: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 6
      },
      defaultValue: 0
    },
    perdidos: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 6
      },
      defaultValue: 0
    },
    puntos: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 18
      },
      defaultValue: 0,
    },
    goles_favor: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0,
    },
    goles_contra: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0,
    },
    capitan_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "https://img.freepik.com/vector-premium/diseno-equipo-jugadores-futbol_184748-74.jpg"
    },
    posicion_historial: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Equipos',
    paranoid: true
  });
  return Equipos;
};