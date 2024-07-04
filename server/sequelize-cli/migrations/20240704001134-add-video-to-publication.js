'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Publications', 'video', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Publications', 'video');
  }
};
