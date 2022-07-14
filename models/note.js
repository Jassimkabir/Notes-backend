const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'notes',
  }
);

module.exports = Note;
