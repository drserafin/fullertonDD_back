// config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Allow SSL connections
        }
    },
    logging: false // Disable SQL logging in the console (optional)
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('Connected to the database successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
