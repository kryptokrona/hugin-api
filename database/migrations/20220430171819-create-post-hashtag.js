'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post_hashtag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'post',
          key: 'id',
          as: 'user_id'
        },
        allowNull: false
      },
      hashtag_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hashtag',
          key: 'id',
          as: 'hashtag_id'
        },
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post_hashtag');
  }
};