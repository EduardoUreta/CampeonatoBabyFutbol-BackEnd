'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estadisticas_Equipo_Partidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      goles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      tarjetas_amarillas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        },
        defaultValue: 0
      },
      tarjetas_rojas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        },
        defaultValue: 0
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
    await queryInterface.dropTable('Estadisticas_Equipo_Partidos');
  }
};