//loads the environment variables from the .env file into process.env
require('dotenv').config();

// Importing the Pool class from the pg package
const { Pool } = require('pg');
const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },

});
// logging a message when the connection is successful
pool.on('connect', () => {
    console.log('connect to vercel database');
});

module.exports = ({
    query: (text, params) => pool.query(text, params),
});