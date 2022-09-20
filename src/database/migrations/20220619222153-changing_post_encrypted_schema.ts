'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('post_encrypted', 'tx_extra')
    await queryInterface.removeColumn('post_encrypted', 'tx_unlock_time')
    await queryInterface.removeColumn('post_encrypted', 'tx_version')

    await queryInterface.addColumn('post_encrypted', 'tx_box', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await queryInterface.addColumn('post_encrypted', 'tx_timestamp', {
      type: Sequelize.BIGINT,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('post_encrypted', 'tx_extra')
    await queryInterface.removeColumn('post_encrypted', 'tx_unlock_time')
    await queryInterface.removeColumn('post_encrypted', 'tx_version')

    await queryInterface.addColumn('post_encrypted', 'tx_box', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await queryInterface.addColumn('post_encrypted', 'tx_timestamp', {
      type: Sequelize.BIGINT,
      allowNull: true,
    })
  }
};
