'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    })

    await queryInterface.changeColumn('post', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'created_at')
    await queryInterface.changeColumn('post', 'updated_at')
  }
};
