'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('post_encrypted', 'postencrypted')
    await queryInterface.renameTable('post_encrypted_group', 'postencryptedgroup')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('post_encrypted', 'postencrypted')
    await queryInterface.renameColumn('post_encrypted_group', 'postencryptedgroup')
  }
}
