// src/routes/index.js
const express = require('express');
const router = express.Router();

// Import your specific routes
const testRoute = require('./testRoute');
const productRoute = require('./productRoute'); // Ensure this is imported correctly
const userRoute = require('./userRoute');

// Use your routes with a specific prefix
router.use('/test', testRoute); // URL will be /api/test
router.use('/products', productRoute); // URL will be /api/products


module.exports = router; // Exporting the router
