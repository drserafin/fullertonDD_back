// src/routes/productRoute.js
const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Ensure this middleware is imported correctly
const { getAllProducts, createProduct, searchProducts } = require('../controllers/productController');

const router = express.Router();



router.get('/', (req,res) => { 
    res.send('Hello welcome to product route');
});
router.post('/upload', upload.array('images', 5), createProduct);
router.get('/search', searchProducts);
router.get('/getAll', getAllProducts)



module.exports = router;
