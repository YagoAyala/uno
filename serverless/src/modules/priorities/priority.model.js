const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Priority = sequelize.define('Priority', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:       { type: DataTypes.STRING,  allowNull: false, unique: true },
  color:      { type: DataTypes.STRING,  allowNull: false },
  created_at: { type: DataTypes.DATE,    allowNull: false },
  updated_at: { type: DataTypes.DATE,    allowNull: false },
}, { tableName: 'priorities', timestamps: false });

module.exports = Priority;
