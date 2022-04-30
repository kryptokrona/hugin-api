'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  //TODO: add relationship here to create a coupling table
  Hashtag.init({
    name: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'hashtag',
  });
  return Hashtag;
};