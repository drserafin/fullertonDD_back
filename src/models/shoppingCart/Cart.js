const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjusting path to go two directories up

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',  // Reference to the 'users' table
      key: 'user_id'   // Column in the 'users' table
    },
    onDelete: 'CASCADE'  // If a user is deleted, their cart is deleted as well
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Cart;
