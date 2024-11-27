const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const passwordUtil = require('../../utils/passwordUtil');  // Correct path to the passwordUtils file

const User = sequelize.define('User', {
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100],
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Hash password before saving user instance using passwordUtils
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await passwordUtil.hashPassword(user.password);  // Use the hashPassword function from passwordUtils
  }
});

User.prototype.isValidPassword = async function (password) {
  return await passwordUtil.comparePasswords(password, this.password);  // Use the comparePasswords function from passwordUtils
};

// Exporting as an object to match the import in controllers
module.exports = User;
