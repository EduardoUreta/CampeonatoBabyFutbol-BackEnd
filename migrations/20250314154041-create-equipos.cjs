'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ganados: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 6
        },
        defaultValue: 0,
      },
      empatados: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 6
        },
        defaultValue: 0,
      },
      perdidos: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 6
        },
        defaultValue: 0,
      },
      puntos: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 18
        },
        defaultValue: 0,
      },
      goles_favor: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        },
        defaultValue: 0,
      },
      goles_contra: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        },
        defaultValue: 0,
      },
      capitan_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      imagen: {
        type: Sequelize.STRING,
        defaultValue: "https://img.freepik.com/vector-premium/diseno-equipo-jugadores-futbol_184748-74.jpg"
      },
      posicion_historial: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }); 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipos');
  }
};