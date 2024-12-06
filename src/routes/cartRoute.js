const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart-level routes

// Get cart by user ID (updated route to match userId instead of cartId)
router.get('/user/:userId', cartController.getCartByUser);  // Use userId to get the cart

// Create a new cart
router.post('/', cartController.createCart);

// Delete a cart
router.delete('/:cartId', cartController.deleteCart);

// Default route (for testing purposes)
router.get('/', (req, res) => { 
    res.send('Hello welcome cart route');
});

module.exports = router;
