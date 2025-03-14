'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Equipos", "capitan_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Jugadores', 
        key: 'id',
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Equipos', 'capitan_id', {
      type: Sequelize.INTEGER,
    });
  }
  
};
