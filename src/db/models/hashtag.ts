'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";
import Post from "./Post";
import PostHashtag from "./PostHashtag";

interface HashtagAttributes {
  id: number;
  name: string;
}
export interface HashtagInput extends Optional<HashtagAttributes, 'id'> {}
export interface HashtagOuput extends Required<HashtagAttributes> {}

class Hashtag extends Model<HashtagAttributes, HashtagInput> implements HashtagAttributes {
  public id!: number
  public name!: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hashtag.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

Hashtag.belongsToMany(Post, {
  through: PostHashtag,
  sourceKey: 'id',
  foreignKey: 'hashtag_id',
  as: 'posts'
});

export default Hashtag;