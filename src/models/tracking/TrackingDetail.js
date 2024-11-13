const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Order = require('../order/Order');  // Import Order model

const TrackingDetail = sequelize.define('TrackingDetail', {
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Unique tracking number
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',  // Default status could be "pending" or any other value
  },
  carrier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,  // Optional: You may want to allow null if the delivery date is unknown
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Add associations
TrackingDetail.belongsTo(Order, { foreignKey: 'orderNo', as: 'order' });
Order.hasMany(TrackingDetail, { foreignKey: 'orderNo', as: 'trackingDetails' });

module.exports = TrackingDetail;
