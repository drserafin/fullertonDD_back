const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Uncomment this to use the database connection

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM products'); // Adjust the table name if necessary
        res.json(results.rows); // Send the results as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error, no products found'); // Send an error response if something goes wrong
    }
});

// Route to add a new product
router.post('/', async (req, res) => {
});


module.exports = router;
