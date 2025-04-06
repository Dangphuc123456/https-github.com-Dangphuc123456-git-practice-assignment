const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Kết nối database của bạn
const AppRole = require('./AppRole'); // Import AppRole model

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Phone: {
    type: DataTypes.CHAR(10),
    allowNull: false
  },
  AppRoleID: {
    type: DataTypes.INTEGER,
    references: {
      model: AppRole,
      key: 'AppRoleID'
    }
  },
  FullName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  CreateAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false 
});

User.belongsTo(AppRole, { foreignKey: 'AppRoleID' }); 

module.exports = User;
