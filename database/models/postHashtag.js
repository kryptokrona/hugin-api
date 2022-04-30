'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostHashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostHashtag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
        as: 'user_id'
      }
    },
    hashtagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hashtag',
        key: 'id',
        as: 'hashtag_id'
      }
    }
  }, {
    sequelize,
    modelName: 'PostHashtag',
    tableName: 'post_hashtag'
  });
  return PostHashtag;
};