// app/routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.json({ message: 'Product list' });
});

module.exports = router;
