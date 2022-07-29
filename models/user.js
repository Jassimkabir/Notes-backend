const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcrypt');

const user = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = user;
