const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart-level routes

// Get cart by user ID
router.get('/:cartId', cartController.getCartByUser);

// Create a new cart
router.post('/', cartController.createCart);

// Delete a cart
router.delete('/:cartId', cartController.deleteCart);

router.get('/', (req, res) => { 
    res.send('Hello welcome cart route');
});

module.exports = router;
