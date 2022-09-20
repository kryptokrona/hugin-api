'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'time', {
      type: Sequelize.BIGINT,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'time')
  }
};
