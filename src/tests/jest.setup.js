jest.setTimeout(10000);  // Set timeout for all tests to 10 seconds

require('dotenv').config();  // Load environment variables from .env file

const sequelize = require('../config/database'); // Import the Sequelize instance
const { Product } = require('../models'); // Import models (if needed for syncing)

beforeAll(async () => {
  // Ensure the database connection is successful
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('Database connection successful!');
    // Only sync models in tests if necessary, else avoid syncing to save time
    if (process.env.NODE_ENV !== 'test') {
      await sequelize.sync({ force: false, alter: true });
      console.log('Database synced successfully!');
    }
  } catch (err) {
    console.error('Error syncing database:', err);
    throw err;  // Fail the tests if connection or sync fails
  }
});

afterAll(async () => {
  // Close the database connection after tests are finished
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Error closing database connection:', err);
  }
});
