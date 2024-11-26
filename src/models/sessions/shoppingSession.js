const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ShoppingSession = sequelize.define('ShoppingSession', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',  // Ensure this matches the users table name
            key: 'user_id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    session_token: {
        type: DataTypes.STRING(100),
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
    tableName: 'shopping_sessions',  // Define the table name if necessary
    timestamps: false,  // Disable automatic timestamps if you have custom fields
});

ShoppingSession.associate = (models) => {
    ShoppingSession.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
    });
};

module.exports = ShoppingSession;
