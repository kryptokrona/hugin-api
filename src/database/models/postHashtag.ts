'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostHashtag extends Model {
    static associate(models) {}
  }
  PostHashtag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
        as: 'user_id'
      }
    },
    hashtag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hashtag',
        key: 'id',
        as: 'hashtag_id'
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PostHashtag',
    tableName: 'post_hashtag'
  });
  return PostHashtag;
};
