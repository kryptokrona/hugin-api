'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up(query: QueryInterface, sequelize: Sequelize) {
  await query.createTable('post', {
    id:          {type: DataTypes.NUMBER,    allowNull: false},
    message:     {type: DataTypes.TEXT,      allowNull: true},
    key:         {type: DataTypes.STRING,    allowNull: true},
    signature:   {type: DataTypes.STRING,    allowNull: true},
    board:       {type: DataTypes.STRING,    allowNull: true},
    time:        {type: DataTypes.BIGINT,    allowNull: true},
    nickname:    {type: DataTypes.STRING,    allowNull: true},
    txHash:      {type: DataTypes.STRING,    allowNull: true, field: "tx_hash"},
    replyTxHash: {type: DataTypes.STRING,    allowNull: true, field: "reply_tx_hash"},
    avatar:      {type: DataTypes.TEXT,      allowNull: true},
    createdAt:   {type: DataTypes.DATEONLY,  allowNull: false, field: 'created_at'},
    updatedAt:   {type: DataTypes.DATEONLY,  allowNull: false, field: 'updated_at'},
  });

  await query.createTable('postencrypted', {});
  await query.createTable('postencryptedgroup', {});
  await query.createTable('hashtag', {});
  await query.createTable('post_hashtag', {});
};

export async function down(query: QueryInterface, sequelize: Sequelize) {
  await query.dropTable('post');
  await query.dropTable('postencrypted');
  await query.dropTable('postencryptedgroup');
  await query.dropTable('hashtag');
  await query.dropTable('post_hashtag');
};
