'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {}
  }

  Post.init({
    message:    {type: DataTypes.TEXT,      allowNull: true},
    key:        {type: DataTypes.STRING,    allowNull: true},
    signature:  {type: DataTypes.STRING,    allowNull: true},
    board:      {type: DataTypes.STRING,    allowNull: true},
    time:       {type: DataTypes.BIGINT,    allowNull: true},
    nickname:   {type: DataTypes.STRING,    allowNull: true},
    tx_hash:    {type: DataTypes.STRING,    allowNull: true},
    createdAt:  {type: DataTypes.DATE,      allowNull: false, field: 'created_at'},
    updatedAt:  {type: DataTypes.DATE,      allowNull: false, field: 'updated_at'},
    reply:      {type: DataTypes.STRING,    allowNull: true},
    avatar:     {type: DataTypes.TEXT,      allowNull: true}
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'post'
  });
  return Post;
};
