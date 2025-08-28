// backend/models/Portfolio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  mainCategory: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'main_category',
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true, // ✅ Ubah jadi true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: true, // ✅
  },
  team: {
    type: DataTypes.STRING(100),
    allowNull: true, // ✅
  },
  client: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tech: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
}, {
  tableName: 'portfolios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Portfolio;