'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Equipos } = models;
      this.belongsTo(Equipos, {
        foreignKey: 'EquipoId',
        targetKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Jugadores.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apodo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Sin Información"
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 18,
        max: 60
      }
    },
    tarjetas_amarillas: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0
    },
    tarjetas_rojas: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0
    },
    partidos_jugados: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "https://w7.pngwing.com/pngs/467/752/png-transparent-computer-icons-encapsulated-postscript-soccer-player-avatar-child-face-hand-thumbnail.png"
    },
    EquipoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Equipos', 
        key: 'id',
      }, 
    },
    goles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Jugadores',
    paranoid: true
  });
  return Jugadores;
};