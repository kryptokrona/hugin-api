'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      this.belongsToMany(models.Post, {
        through: models.PostHashtag,
        as: 'posts',
        foreignKey: 'hashtag_id',
        onDelete: 'CASCADE'
      })
    }
  }

  Hashtag.init({
    name: {type: DataTypes.STRING, allowNull: false},
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Hashtag',
    tableName: 'hashtag'
  });
  return Hashtag;
};
