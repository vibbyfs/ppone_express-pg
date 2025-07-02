'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addConstraint('UserProfiles',{
      fields :['user_id'],
      type : 'foreign key',
      name : 'fk_userprofiles_userid',
      references : {
        table :'Users',
        field :'id'
      },
      onUpdate :'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
 
  await queryInterface.removeConstraint('UserProfiles', 'fk_userprofiles_userid')


  }
};
