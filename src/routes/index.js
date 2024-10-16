const express = require('express');
const router = express.Router();

// Import your specific routes
const testRoute = require('./testRoute');
const productRoute = require('./productRoute'); // Assuming you have a productRoute
const userRoute = require('./userRoute');

// Use your routes with a specific prefix
router.use('/test', testRoute); // This means the URL will be /api/test
router.use('/products', productRoute); // This means the URL will be /api/products
router.use('/user', userRoute); // This means the URL will be /api/users

// You can add more routes here as needed

module.exports = router; // Exporting the router
