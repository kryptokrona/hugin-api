'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('post_encrypted', 'createdAt', 'created_at')
    await queryInterface.renameColumn('post_encrypted', 'updatedAt', 'updated_at')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('post_encrypted', 'createdAt', 'created_at')
    await queryInterface.renameColumn('post_encrypted', 'updatedAt', 'updated_at')
  }
};
