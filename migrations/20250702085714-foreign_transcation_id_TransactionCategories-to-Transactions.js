'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('TransactionCategories',{
      fields :['transaction_id'],
      type : 'foreign key',
      name : 'fk_transactioncategories_transactiontid',
      references : {
        table :'Transactions',
        field :'id'
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.removeConstraint('TransactionCategories', 'fk_transcationcategories_transactionid')
  }
};
