'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Partidos extends Model {
    static associate(models) {
      const { Equipos } = models;
      // Asociaciones
      this.belongsTo(Equipos, {
        foreignKey: 'equipo_uno',
        as: 'equipoUno'
      });

      this.belongsTo(Equipos, {
        foreignKey: 'equipo_dos',
        as: 'equipoDos'
      });
    }
  }

  Partidos.init(
    {
      equipo_uno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipos',
          key: 'id',
        },
      },
      goles_equipo_uno: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      equipo_dos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipos',
          key: 'id',
        },
      },
      goles_equipo_dos: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      resultado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ronda: {
        type: DataTypes.ENUM(
          'Fecha 1',
          'Fecha 2',
          'Fecha 3',
          'Fecha 4',
          'Fecha 5',
          'Fecha 6'
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Partidos',
      paranoid: true,
    }
  );

  return Partidos;
};
