// models/AppRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AppRole = sequelize.define('AppRole', {
  AppRoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AppRoleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
  },
}, {
    tableName: 'AppRoles',
    timestamps: false 
});

module.exports = AppRole;
