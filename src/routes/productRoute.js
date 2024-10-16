const express = require('express');
const router = express.Router();
const Product = require('../models/productMode'); // Correctly importing the model
const { getAllProducts, createProduct, searchProducts } = require('../controllers/productController');

// Route to get all products
router.get('/', getAllProducts); // Use the controller function instead of a raw SQL query

// Define the search route
router.get('/search', searchProducts); // Fix the spelling from 'serach' to 'search'

// Route to add a new product
router.post('/', createProduct); // Use the controller function to handle product creation

module.exports = router;
