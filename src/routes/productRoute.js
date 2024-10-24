// src/routes/productRoute.js
const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Ensure this middleware is imported correctly
const { getAllProducts,getOneProduct, createProduct, searchProducts, updateStockAndAvailability,listProductIdsAndNames, deleteProductById,updateProduct } = require('../controllers/productController');

const router = express.Router();

//GET Methods
router.get('/', (req,res) => { 
    res.send('Hello welcome to product route');
});
router.get('/getOne/:id', getOneProduct);
router.get('/search', searchProducts);
router.get('/getAll', getAllProducts)
router.get('/list', listProductIdsAndNames);

//POST Methods
router.post('/upload', upload.array('images', 5), createProduct);
router.post('/purchase', async (req, res) => {
    const { productId, quantityPurchased } = req.body;
    
    try {
        const result = await updateStockAndAvailability(productId, quantityPurchased);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//PUT Methods
router.put('/update/:id', upload.array('images', 5), updateProduct);

//DELETE Methods
router.delete('/delete/:id', deleteProductById);


module.exports = router;
