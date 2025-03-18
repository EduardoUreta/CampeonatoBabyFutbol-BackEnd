'use strict';
const { hash } = require("argon2");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Ingresa un correo válido"
        }
      }
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        max: 12
      }
    },
    rol: {
      type: DataTypes.ENUM("Admin", "Usuario"),
      defaultValue: "Usuario",
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
    paranoid: true,
    hooks: {
      beforeSave: async (user, options) => {
        if(user.changed('contrasena')){
          user.contrasena = await hash(user.contrasena);
        }
      }
    }
  });
  return Usuarios;
};