const express = require('express');
const router = express.Router();

// Import your specific routes
const testRoute = require('./testRoute');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const orderRoute = require('./orderRoute');
const paymentRoute = require('./paymentRoute');
const trackingRoute = require('./trackingRoute');

// Use your routes with a specific prefix
router.use('/test', testRoute); // URL will be /api/test
router.use('/products', productRoute); // URL will be /api/products
router.use('/users', userRoute); // URL will be /api/users
router.use('/orders', orderRoute); // URL will be /api/orders
router.use('/payments', paymentRoute); // URL will be /api/payments
router.use('/tracking', trackingRoute); // URL will be /api/tracking

// Export the router
module.exports = router;
