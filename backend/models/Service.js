// backend/models/Service.js (BUKAN Services.js)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan path ini benar

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 2000] // Minimal 10 karakter untuk deskripsi
    }
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '🛠️'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['Design', 'Development', 'Marketing', 'Consulting', 'Production']]
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'from-gray-400 to-gray-600'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'services',
  timestamps: true, // createdAt & updatedAt
});

// Instance method untuk return safe JSON (tanpa data sensitif jika ada)
Service.prototype.toSafeJSON = function() {
  const values = Object.assign({}, this.get());
  return values; // Untuk service tidak ada data sensitif yang perlu disembunyikan
};

// Static method untuk get services by category
Service.getServicesByCategory = async function(category) {
  return await this.findAll({
    where: { 
      category,
      isActive: true 
    },
    order: [['createdAt', 'DESC']]
  });
};

// Static method untuk get active services only
Service.getActiveServices = async function() {
  return await this.findAll({
    where: { isActive: true },
    order: [['createdAt', 'DESC']]
  });
};

// Hook sebelum validasi untuk trim whitespace
Service.addHook('beforeValidate', (service, options) => {
  if (service.title) {
    service.title = service.title.trim();
  }
  if (service.description) {
    service.description = service.description.trim();
  }
  if (service.category) {
    service.category = service.category.trim();
  }
});

module.exports = Service;