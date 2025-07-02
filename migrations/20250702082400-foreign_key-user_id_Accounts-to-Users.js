'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Accounts',{
      fields :['user_id'],
      type : 'foreign key',
      name : 'fk_accounts_userid',
      references : {
        table :'Users',
        field :'id'
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.removeConstraint('Accounts', 'fk_accounts_userid')
  }
};
