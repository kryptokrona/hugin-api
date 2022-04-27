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
    message: {type: DataTypes.TEXT, allowNull: false},
    key: {type: DataTypes.STRING, allowNull: false},
    signature: {type: DataTypes.STRING, allowNull: false},
    board: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING, allowNull: false},
    nickname: {type: DataTypes.STRING, allowNull: false},
    timestamps: false,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};