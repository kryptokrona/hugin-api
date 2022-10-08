'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {}
  }
  Wallet.init({
    encrypted_wallet: DataTypes.TEXT,
    mnemonic_seed: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'wallet',
    modelName: 'Wallet',
  });
  return Wallet;
};