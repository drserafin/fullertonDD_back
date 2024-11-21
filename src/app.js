const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const checkCartId = require('./middleware/generateCartId'); // Import the checkCartId middleware
const cronJobs = require('./jobs/cronJobs');  // Import your cron jobs here


// Middleware to parse JSON
app.use(express.json());

// Middleware to parse cookies (should be used before routes that require it)
app.use(cookieParser());

// Use checkCartId middleware to check for cartId before handling cart routes
app.use('/api/cart/items', checkCartId);  // Ensure cartId exists for adding items

// API Routes
app.use('/api', routes); // This allows access to all routes prefixed with /api

// Root route
app.get('/', (req, res) => { 
    res.send('Hello, World! My name is Kevin Serafin');
});

// API root route
app.get('/api', (req, res) => { 
    res.send('Hello, API');
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; // Make sure to export the app for testing
