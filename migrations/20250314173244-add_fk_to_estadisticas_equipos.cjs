'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Estadisticas_Equipo_Partidos", "partido_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Partidos', 
        key: 'id',
      },
    }),
    await queryInterface.changeColumn("Estadisticas_Equipo_Partidos", "equipo_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Equipos', 
        key: 'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Estadisticas_Equipo_Partidos', 'partido_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn('Estadisticas_Equipo_Partidos', 'equipo_id', {
      type: Sequelize.INTEGER,
    });
  }
};
