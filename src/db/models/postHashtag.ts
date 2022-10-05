'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/config";
import Hashtag from "./Hashtag";
import Post from "./post";

//TODO: check which attributes should be optional or not
interface PostHashtagAttributes {
  id: number;
  postId: number;
  hashtagId: number;
}

export interface PostHashtagInput extends Optional<PostHashtagAttributes, 'id'> {}
export interface PostHashtagOuput extends Required<PostHashtagAttributes> {}

class PostHashtag extends Model<PostHashtagAttributes, PostHashtagInput> implements PostHashtagAttributes {
  public id!: number;
  public postId!: number;
  public hashtagId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostHashtag.init({
  id: {
    type: DataTypes.INTEGER
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: "id"
    }
  },
  hashtagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Hashtag,
      key: "id"
    }
  },
}, {
  tableName: "post_hashtag",
  timestamps: false,
  sequelize: sequelizeConnection
})

export default PostHashtag;