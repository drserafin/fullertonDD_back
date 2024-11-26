const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjusting path to go two directories up

// Define the UserAddress model
const UserAddress = sequelize.define('UserAddress', {
  // Address Line 1
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Address Line 2 (optional)
  addressLine2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // City
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // State or Province
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Postal Code
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Country
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Foreign Key: User ID (Assuming each address belongs to a user)
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // Name of the users table
      key: 'user_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  // Timestamps settings: Sequelize will handle createdAt and updatedAt fields automatically
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Associations (to link UserAddress to User)
UserAddress.associate = (models) => {
  UserAddress.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user', // Alias to associate user with address
    onDelete: 'CASCADE',  // Delete address if the user is deleted
  });
};

module.exports = UserAddress;
