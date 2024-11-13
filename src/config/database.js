// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Log the database URL for debugging
console.log('Database URL:', process.env.POSTGRES_URL);

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Allow SSL connections
        }
    },
    logging: false // Disable SQL logging in the console (optional)
});

// Test inconnection
sequelize.authenticate()
    .then(() => console.log('Connected to the database successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
