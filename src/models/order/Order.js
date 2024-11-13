const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  order_status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  },
  payment_status: {
    type: DataTypes.STRING,
    defaultValue: 'Unpaid'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Order;
