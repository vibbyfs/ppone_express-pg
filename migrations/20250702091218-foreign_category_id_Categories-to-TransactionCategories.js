'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('TransactionCategories',{
      fields :['category_id'],
      type : 'foreign key',
      name : 'fk_transactioncategories_categoryid',
      references : {
        table :'Categories',
        field :'id'
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeConstraint('TransactionCategories', 'fk_transcationcategories_categoryid')
  }
};
