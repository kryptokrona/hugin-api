'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";

//TODO: check which attributes should be optional or not
interface PostEncryptedGroupAttributes {
  id: number;
  txHash?: string;
  txSb?: string;
  txTimestamp?: bigint;
}

export interface PostEncryptedGroupInput extends Optional<PostEncryptedGroupAttributes, 'id'> {}
export interface PostEncryptedGroupOuput extends Required<PostEncryptedGroupAttributes> {}

class PostEncryptedGroup extends Model<PostEncryptedGroupAttributes, PostEncryptedGroupInput> implements PostEncryptedGroupAttributes {
  public id!: number;
  public txHash?: string;
  public txSb?: string;
  public txTimestamp?: bigint;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostEncryptedGroup.init({
  id:           {type: DataTypes.NUMBER, allowNull: false},
  txHash:       {type: DataTypes.STRING, allowNull: true},
  txSb:         {type: DataTypes.TEXT,   allowNull: true},
  txTimestamp:  {type: DataTypes.BIGINT, allowNull: true},
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

export default PostEncryptedGroup;