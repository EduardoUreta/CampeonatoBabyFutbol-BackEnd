'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Estadisticas_Equipo_Partidos", "jugador_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Jugadores",
        key: "id"
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Estadisticas_Equipo_Partidos', 'jugador_id');
  }
};
