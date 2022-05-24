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
      this.belongsToMany(models.Hashtag, {
        through: models.PostHashtag,
        as: 'hashtags',
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
      })
    }
  }

  Post.init({
    message:    {type: DataTypes.TEXT, allowNull: true},
    key:        {type: DataTypes.STRING, allowNull: true},
    signature:  {type: DataTypes.STRING, allowNull: true},
    board:      {type: DataTypes.STRING, allowNull: true},
    time:       {type: DataTypes.INTEGER, allowNull: true},
    nickname:   {type: DataTypes.STRING, allowNull: true},
    tx_hash:    {type: DataTypes.STRING, allowNull: true},
    createdAt:  {type: DataTypes.DATEONLY, allowNull: false, field: 'created_at'},
    updatedAt:  {type: DataTypes.DATEONLY, allowNull: false, field: 'updated_at'},
    reply:      {type: DataTypes.STRING, allowNull: true}
  }, {      
    sequelize,
    modelName: 'Post',
    tableName: 'post'
  });
  return Post;
};