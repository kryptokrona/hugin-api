'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    message: {type: DataTypes.STRING, allowNull: true},
    key: {type: DataTypes.STRING, allowNull: true},
    signature: {type: DataTypes.STRING, allowNull: true},
    board: {type: DataTypes.STRING, allowNull: true},
    time: {type: DataTypes.INTEGER, allowNull: true},
    nickname: {type: DataTypes.STRING, allowNull: true},
    tx_hash: {type: DataTypes.STRING, allowNull: true},
    createdAt: {type: DataTypes.DATE, allowNull: false},
    updatedAt: {type: DataTypes.DATE, allowNull: false}
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};