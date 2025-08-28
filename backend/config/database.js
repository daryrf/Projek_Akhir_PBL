// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('creative_agency', 'root', 'bismillah123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // matikan log query (opsional)
});

module.exports = sequelize;