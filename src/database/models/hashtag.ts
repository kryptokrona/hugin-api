'use strict';

import { Sequelize, DataType, Model } from "sequelize";

const {
  Model
} = require('sequelize');
export = (sequelize: Sequelize, DataTypes: DataType) => {
  class Hashtag extends Model {
    static associate(models: Models) {
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
