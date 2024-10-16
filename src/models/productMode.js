const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection


class Product extends Model {}

// Define the Product model
Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products', // Ensure this matches your table name in PostgreSQL
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the Product model
module.exports = Product;
