'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";
import Hashtag from "./Hashtag";

//TODO: check which attributes should be optional or not
interface PostAttributes {
  id: number;
  message: string;
  key?: string;
  signature?: string;
  board?: string;
  time?: bigint;
  nickname?: string;
  txHash?: string;
  reply?: string;
  avatar?: string;
}
export interface PostInput extends Optional<PostAttributes, 'id'> {}
export interface PostOuput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: number
  public message!: string
  public key?: string;
  public signature?: string;
  public board?: string;
  public time?: bigint;
  public nickname?: string;
  public txHash?: string;
  public reply?: string;
  public avatar?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  id:         {type: DataTypes.NUMBER,    allowNull: false},
  message:    {type: DataTypes.TEXT,      allowNull: true},
  key:        {type: DataTypes.STRING,    allowNull: true},
  signature:  {type: DataTypes.STRING,    allowNull: true},
  board:      {type: DataTypes.STRING,    allowNull: true},
  time:       {type: DataTypes.BIGINT,    allowNull: true},
  nickname:   {type: DataTypes.STRING,    allowNull: true},
  txHash:     {type: DataTypes.STRING,    allowNull: true},
  reply:      {type: DataTypes.STRING,    allowNull: true},
  avatar:     {type: DataTypes.TEXT,      allowNull: true}
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

Post.belongsToMany(Hashtag, {
  through: PostHashtag,
  sourceKey: 'id',
  foreignKey: 'post_id',
  as: 'hashtags'
});

export default Post;
