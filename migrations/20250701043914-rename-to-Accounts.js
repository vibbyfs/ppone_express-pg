'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserProfiles', 'asress', 'adress');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserProfiles', 'asress', 'adress');
  }
};
