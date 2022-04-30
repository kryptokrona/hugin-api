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
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'post',
          key: 'id',
          as: 'user_id'
        },
        allowNull: true
      },
      hashtagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hashtag',
          key: 'id',
          as: 'hashtag_id'
        },
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post_hashtag');
  }
};