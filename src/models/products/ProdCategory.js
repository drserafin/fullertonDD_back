const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProdCategory = sequelize.define('ProdCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = ProdCategory;
