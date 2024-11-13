const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get all carts
router.get('/', cartController.getAllCarts);

// Get cart for a specific user
router.get('/:userId', cartController.getCartByUser);

// Create a new cart
router.post('/', cartController.createCart);

// Update a cart (e.g., add/remove products)
router.put('/:cartId', cartController.updateCart);

// Delete a cart
router.delete('/:cartId', cartController.deleteCart);

module.exports = router;
