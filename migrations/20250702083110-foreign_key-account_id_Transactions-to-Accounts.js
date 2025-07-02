'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Transactions',{
      fields :['account_id'],
      type : 'foreign key',
      name : 'fk_transactions_accountid',
      references : {
        table :'Accounts',
        field :'id'
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.removeConstraint('Transactions', 'fk_transcations_accountid')
  }
};
