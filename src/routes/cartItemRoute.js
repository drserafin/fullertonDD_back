// routes/cartItemRoute.js
const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

// Add a product to the cart
router.post('/', cartItemController.addItemToCart);  // Removed cartId from URL since it's stored in the cookie

// Remove a product from the cart
router.delete('/:cartId/items/:productId', cartItemController.removeItemFromCart);

// Update the quantity of a product in the cart
router.put('/:cartId/items/:productId', cartItemController.updateItemQuantity);

module.exports = router;
