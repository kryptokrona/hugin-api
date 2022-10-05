'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";

//TODO: check which attributes should be optional or not
interface PostEncryptedAttributes {
  id: number;
  txHash?: string;
  txBox?: string;
  txTimestamp?: bigint;
}

export interface PostEncryptedInput extends Optional<PostEncryptedAttributes, 'id'> {}
export interface PostEncryptedOuput extends Required<PostEncryptedAttributes> {}

class PostEncrypted extends Model<PostEncryptedAttributes, PostEncryptedInput> implements PostEncryptedAttributes {
  public id!: number;
  public txHash?: string;
  public txBox?: string;
  public txTimestamp?: bigint;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostEncrypted.init({
  id:           {type: DataTypes.NUMBER, allowNull: false},
  txHash:       {type: DataTypes.TEXT,   allowNull: true},
  txBox:        {type: DataTypes.TEXT,   allowNull: true},
  txTimestamp:  {type: DataTypes.BIGINT, allowNull: true},
}, {
  tableName: "postencrypted",
  timestamps: true,
  sequelize: sequelizeConnection
})

export default PostEncrypted;