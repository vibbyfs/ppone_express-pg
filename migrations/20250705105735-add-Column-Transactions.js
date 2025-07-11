'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'type_transaction', { type: Sequelize.STRING })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'type_transaction');

  }
  
};
