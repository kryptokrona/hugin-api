'use strict';

import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config'

interface HashtagAttributes {
  id: number;
  name: string;
}
export interface HashtagInput extends Optional<HashtagAttributes, 'id'> {}
export interface HashtagOuput extends Required<HashtagAttributes> {}

class Hashtag extends Model<HashtagAttributes, HashtagInput> implements HashtagAttributes {
  public id!: number
  public name!: string
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hashtag.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

export default Hashtag;