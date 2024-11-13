const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjusting path to go two directories up

// Define the UserPayment model
const UserPayment = sequelize.define('UserPayment', {
  // Transaction ID (unique identifier for each transaction)
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure the transaction ID is unique
  },
  // Payment Amount
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Payment Method (e.g., credit card, PayPal, etc.)
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Payment Status (e.g., pending, completed, failed)
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // Default to pending
  },
  // Date when the payment was made
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to the current date/time
  },
  // Optional: A note about the payment (e.g., error message, description)
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Optionally, add associations if needed (for example, if you have a User model)
UserPayment.associate = (models) => {
  // UserPayment belongs to a User (one-to-many)
  UserPayment.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE', // Delete payments if the user is deleted
  });
};

// Export the model
module.exports = UserPayment;
