const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

// Add a product to the cart
router.post('/', cartItemController.addItemToCart);  // Removed cartId from URL

// Remove a product from the cart (no need for cartId in the URL)
router.delete('/items/:productId', cartItemController.removeItemFromCart);

// Update the quantity of a product in the cart (no need for cartId in the URL)
router.put('/items/:productId', cartItemController.updateItemQuantity);

module.exports = router;
