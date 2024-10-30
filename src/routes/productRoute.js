const express = require('express');
const { upload, handleImageUpload } = require('../middleware/uploadMiddleware'); // Ensure this path is correct
const { 
    getAllProducts,
    getOneProduct, 
    createProduct, 
    searchProducts, 
    updateStockAndAvailability,
    listProductIdsAndNames, 
    deleteProductById,
    updateProduct 
} = require('../controllers/productController');

const router = express.Router();

// GET Methods
router.get('/', (req, res) => { 
    res.send('Hello welcome to product route');
});
router.get('/getOne/:id', getOneProduct);
router.get('/search', searchProducts);
router.get('/getAll', getAllProducts);
router.get('/list', listProductIdsAndNames);

// POST method to upload a product (with image upload logic)
router.post('/upload', upload, handleImageUpload, createProduct);

// POST method to purchase a product
router.post('/purchase', async (req, res) => {
    const { productId, quantityPurchased } = req.body;
    
    try {
        const result = await updateStockAndAvailability(productId, quantityPurchased);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT method to update a product (with image URLs)
router.put('/update/:id', upload, handleImageUpload, updateProduct); // Use upload and handleImageUpload for updates

// DELETE method to delete a product by ID
router.delete('/delete/:id', deleteProductById);

module.exports = router;
