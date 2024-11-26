/* eslint-env jest */

jest.setTimeout(10000);  // Set timeout for all tests to 10 seconds

require('dotenv').config();  // Load environment variables from .env file

const sequelize = require('../config/database'); // Import the Sequelize instance

beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('Database connection successful!');
    if (process.env.NODE_ENV !== 'test') {
      await sequelize.sync({ force: false, alter: true });
      console.log('Database synced successfully!');
    }
  } catch (err) {
    console.error('Error syncing database:', err);
    throw err;
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Error closing database connection:', err);
  }
});
