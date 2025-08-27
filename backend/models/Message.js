// backend/models/Message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Koneksi ke DB

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'messages',
  timestamps: true, // createdAt & updatedAt
});

module.exports = Message;