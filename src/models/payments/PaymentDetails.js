const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Assuming your DB connection setup is here
const Order = require('../shoppingCart/Order');  // Assuming you have an Order model

const PaymentDetails = sequelize.define('PaymentDetails', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',  // Name of the orders table
            key: 'order_id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    payment_method: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING(50),
        defaultValue: 'Pending',
    },
    transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'payment_details',  // Explicitly defining the table name
    timestamps: false,  // You have manually defined created_at and updated_at
});

PaymentDetails.associate = (models) => {
    PaymentDetails.belongsTo(models.Order, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE',
    });
};

module.exports = PaymentDetails;
