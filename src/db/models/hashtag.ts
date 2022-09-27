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


import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface HashtagAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface HashtagInput extends Optional<HashtagAttributes, 'id' | 'slug'> {}
export interface HashtagOuput extends Required<HashtagAttributes> {}

class Ingredient extends Model<HashtagAttributes, HashtagInput> implements HashtagAttributes {
  public id!: number
  public name!: string
  public slug!: string
  public description!: string
  public foodGroup!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}