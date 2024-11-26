const express = require('express');
const router = express.Router();
const shoppingSessionController = require('../controllers/shoppingSessionController');

// Create a shopping session (can be for guest or logged-in user)
router.post('/create', shoppingSessionController.createSession);

// Get current shopping session (retrieve session details)
router.get('/:sessionId', shoppingSessionController.getSession);

// Add product to shopping session (cart)
router.post('/:sessionId/add', shoppingSessionController.addProductToSession);

// Remove product from shopping session
router.delete('/:sessionId/remove/:productId', shoppingSessionController.removeProductFromSession);

module.exports = router;
