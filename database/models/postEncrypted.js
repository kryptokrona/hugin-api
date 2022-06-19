'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostEncrypted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostEncrypted.init({
    tx_hash: {type: DataTypes.STRING, allowNull: true},
    tx_extra: {type: DataTypes.TEXT, allowNull: true},
    tx_unlock_time: {type: DataTypes.INTEGER, allowNull: true},
    tx_version: {type: DataTypes.INTEGER, allowNull: true},
  }, {
    sequelize,
    modelName: 'PostEncrypted',
    tableName: 'post_encrypted'
  });
  return PostEncrypted;
};