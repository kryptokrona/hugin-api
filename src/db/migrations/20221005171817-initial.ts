'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';
import Hashtag from '../models/Hashtag';
import Post from '../models/Post';

export async function up(query: QueryInterface, sequelize: Sequelize) {
  await query.createTable('post', {
    id:          {type: DataTypes.NUMBER,    allowNull: false},
    message:     {type: DataTypes.TEXT,      allowNull: true},
    key:         {type: DataTypes.STRING,    allowNull: true},
    signature:   {type: DataTypes.STRING,    allowNull: true},
    board:       {type: DataTypes.STRING,    allowNull: true},
    time:        {type: DataTypes.BIGINT,    allowNull: true},
    nickname:    {type: DataTypes.STRING,    allowNull: true},
    txHash:      {type: DataTypes.STRING,    allowNull: true,  field: "tx_hash"},
    replyTxHash: {type: DataTypes.STRING,    allowNull: true,  field: "reply_tx_hash"},
    avatar:      {type: DataTypes.TEXT,      allowNull: true},
    createdAt:   {type: DataTypes.DATEONLY,  allowNull: false, field: 'created_at'},
    updatedAt:   {type: DataTypes.DATEONLY,  allowNull: false, field: 'updated_at'},
  });

  await query.createTable('postencrypted', {
    id:           {type: DataTypes.NUMBER,   allowNull: false},
    txHash:       {type: DataTypes.TEXT,     allowNull: true,  field: "tx_hash"},
    txBox:        {type: DataTypes.TEXT,     allowNull: true,  field: "tx_box"},
    txTimestamp:  {type: DataTypes.BIGINT,   allowNull: true,  field: "tx_timestamp"},
    createdAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'created_at'},
    updatedAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'updated_at'},
  });

  await query.createTable('postencryptedgroup', {
    id:           {type: DataTypes.NUMBER,   allowNull: false},
    txHash:       {type: DataTypes.STRING,   allowNull: true,  field: "tx_hash"},
    txSb:         {type: DataTypes.TEXT,     allowNull: true,  field: "tx_sb"},
    txTimestamp:  {type: DataTypes.BIGINT,   allowNull: true,  field: "tx_timestamp"},
    createdAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'created_at'},
    updatedAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'updated_at'},
  });

  await query.createTable('hashtag', {
    id:   {type: DataTypes.NUMBER, allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false },
    createdAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'created_at'},
    updatedAt:    {type: DataTypes.DATEONLY, allowNull: false, field: 'updated_at'},
  });
  
  await query.createTable('post_hashtag', {
    id: {type: DataTypes.NUMBER},
    postId: {
      type: DataTypes.NUMBER,
      references: {
        model: Post,
        key: "id"
      },
      field: "post_id",
    },
    hashtagId: {
      type: DataTypes.NUMBER,
      references: {
        model: Hashtag,
        key: "id"
      },
      field: "hashtag_id",
    },
  });
};

export async function down(query: QueryInterface, sequelize: Sequelize) {
  await query.dropTable('post');
  await query.dropTable('postencrypted');
  await query.dropTable('postencryptedgroup');
  await query.dropTable('hashtag');
  await query.dropTable('post_hashtag');
};
