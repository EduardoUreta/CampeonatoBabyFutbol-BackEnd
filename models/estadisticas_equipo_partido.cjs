'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estadisticas_Equipo_Partido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Partidos, Equipos } = models;

      this.belongsTo(Partidos, {
        foreignKey: 'partido_id',
      });

      this.belongsTo(Equipos, {
        foreignKey: 'equipo_id',
      });
    }
  }
  Estadisticas_Equipo_Partido.init({
    partido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    tarjetas_amarillas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      },
      defaultValue: 0
    },
    tarjetas_rojas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Estadisticas_Equipo_Partido',
    paranoid: true
  });
  return Estadisticas_Equipo_Partido;
};