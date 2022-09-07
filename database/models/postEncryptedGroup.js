'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostEncryptedGroup extends Model {
    static associate(models) {}
  }
  PostEncryptedGroup.init({
    tx_hash:        {type: DataTypes.STRING,  allowNull: true},
    tx_sb:          {type: DataTypes.TEXT,    allowNull: true},
    tx_timestamp:   {type: DataTypes.BIGINT,  allowNull: true},
    createdAt:      {type: DataTypes.DATE,    allowNull: false, field: 'created_at'},
    updatedAt:      {type: DataTypes.DATE,    allowNull: false, field: 'updated_at'},
  }, {
    sequelize,
    modelName: 'PostEncryptedGroup',
    tableName: 'postencryptedgroup'
  });
  return PostEncryptedGroup;
};
