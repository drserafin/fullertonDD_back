const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get orders by user
router.get('/user/:userId', orderController.getOrdersByUser);

// Get specific order
router.get('/:orderId', orderController.getOrderById);

// Create a new order
router.post('/', orderController.createOrder);

// Update an order
router.put('/:orderId', orderController.updateOrder);

// Delete an order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
