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
    tx_box: {type: DataTypes.TEXT, allowNull: true},
    tx_timestamp: {type: DataTypes.BIGINT, allowNull: true},
    createdAt: {type: DataTypes.DATE,      allowNull: false, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE,      allowNull: false, field: 'updated_at'},
  }, {
    sequelize,
    modelName: 'PostEncrypted',
    tableName: 'post_encrypted'
  });
  return PostEncrypted;
};