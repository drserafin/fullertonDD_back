// Loads the environment variables from the .env file into process.env
require('dotenv').config();

// Importing the Pool class from the pg package
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});

// Logging a message when the connection is successful
pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
