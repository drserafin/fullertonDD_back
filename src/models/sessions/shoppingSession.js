const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Assuming your DB connection setup is here
const User = require('./user');  // Assuming you have a User model

const ShoppingSession = sequelize.define('ShoppingSession', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  // User can be NULL (for guest sessions)
        references: {
            model: 'users',  // Name of the users table
            key: 'user_id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    session_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
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
    tableName: 'shopping_session',  // Explicitly defining the table name
    timestamps: false,  // Since you have created_at and updated_at manually
});

ShoppingSession.associate = (models) => {
    ShoppingSession.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
    });
};

module.exports = ShoppingSession;
