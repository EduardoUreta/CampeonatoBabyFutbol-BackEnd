'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadores', {
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
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apodo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Sin Información"
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 60
        }
      },
      tarjetas_amarillas: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
        defaultValue: 0
      },
      tarjetas_rojas: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
        defaultValue: 0
      },
      partidos_jugados: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
        defaultValue: 0
      },
      imagen: {
        type: Sequelize.STRING,
        defaultValue: "https://w7.pngwing.com/pngs/467/752/png-transparent-computer-icons-encapsulated-postscript-soccer-player-avatar-child-face-hand-thumbnail.png"
      },
      equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipos', 
          key: 'id',
        },  
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
    await queryInterface.dropTable('Jugadores');
  }
};