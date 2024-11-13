const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjusting path to go two directories up
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,  // Ensures that the username is not empty
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Ensures that the email is in a valid email format
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100],  // Password length validation (at least 6 characters)
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Hash password before saving user instance
User.beforeCreate(async (user) => {
  if (user.password) {
    // Hash password using bcryptjs before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

// Optional: Method to validate user password when logging in
/* User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}; */

module.exports = User;
