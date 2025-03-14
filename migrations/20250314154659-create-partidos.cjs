'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipo_uno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipos', 
          key: 'id',
        },
      },
      goles_equipo_uno: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        }
      },
      equipo_dos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipos', 
          key: 'id',
        },
      },
      goles_equipo_dos: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        }
      },
      resultado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ronda: {
        type: Sequelize.ENUM("Fecha 1","Fecha 2","Fecha 3","Fecha 4","Fecha 5","Fecha 6"),
        allowNull: false
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
    await queryInterface.dropTable('Partidos');
  }
};