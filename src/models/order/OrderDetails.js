const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const OrderDetails = sequelize.define('OrderDetails', {
    order_details_id: {
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
    shipping_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_address',  // Name of the user_address table
            key: 'address_id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    payment_method: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    shipping_status: {
        type: DataTypes.STRING(50),
        defaultValue: 'Pending',
    },
    tracking_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
    tableName: 'order_details',  // Explicitly defining the table name
    timestamps: false,  // Since you have created_at and updated_at manually
});

OrderDetails.associate = (models) => {
    OrderDetails.belongsTo(models.Order, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE',
    });
    OrderDetails.belongsTo(models.UserAddress, {
        foreignKey: 'shipping_address_id',
        onDelete: 'CASCADE',
    });
};

module.exports = OrderDetails;
