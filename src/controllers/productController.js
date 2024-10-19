const Product = require('../models/productModel');
const { Op } = require('sequelize');
const sharp = require('sharp'); // Import sharp for image resizing
const path = require('path'); // Import path to handle file paths

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error, no products found');
    }
};

// Function to create a new product (with image upload logic)
const createProduct = async (req, res) => {
    try {
        console.log('Upload route hit'); // Log when route is hit
        console.log('Request body:', req.body); // Log request body for debugging
        console.log('Uploaded files:', req.files); // Log uploaded files for debugging

        // Extract product details from request body
        const { name, description, price, category, stock_quantity, available } = req.body;

        // Handle multiple image uploads

        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        console.log('Category:', category);  // Add this before creating the product
        // Create the product with image URLs
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock_quantity,
            available: available === 'true', // Handle boolean conversion
            image_url: imageUrls // Correct variable name (imageUrls)
        });

        // Respond with success message and new product details
        res.status(201).json({
            message: 'Product created successfully!',
            product: newProduct
        });
    } catch (error) {
        console.error('Error adding product:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to search products with query parameters
const searchProducts = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        let searchConditions = {};
        if (name) {
            searchConditions.name = { [Op.iLike]: `%${name}%` };  // Case-insensitive search
        }
        if (category) {
            searchConditions.category = category;
        }
        if (minPrice && maxPrice) {
            searchConditions.price = { [Op.between]: [minPrice, maxPrice] };
        }

        console.log('Search Conditions:', searchConditions); // Log search conditions

        const products = await Product.findAll({
            where: searchConditions
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Function to upload and resize an image
const uploadImage = async (req, res) => {
    try {
        await resizeImage(req.file.path); // Call the resize function
        res.status(201).json({ message: 'Image uploaded and resized successfully!' });
    } catch (error) {
        console.error('Error resizing image:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};

const updateStockAndAvailability = async (productId, quantityPurchased) => {
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock_quantity >= quantityPurchased) {
            // Update stock quantity
            product.stock_quantity -= quantityPurchased;

            // Update availability
            product.available = product.stock_quantity > 0;

            // Save the updated product
            await product.save();
            return { message: 'Purchase successful!', product };
        } else {
            return { message: 'Insufficient stock available.' };
        }
    } catch (error) {
        console.error('Error updating stock:', error);
        throw new Error('Failed to update stock');
    }
};

const getOneProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};




// Function to resize the image
const resizeImage = async (filePath) => {
    await sharp(filePath)
        .resize(1000, 1000) // Resize to 1000x1000 pixels
        .toFile(path.join(__dirname, '../uploads', path.basename(filePath))); // Save resized image to the uploads folder
};

module.exports = {
    getAllProducts,
    createProduct,
    searchProducts,
    uploadImage, // Ensure uploadImage is exported
    updateStockAndAvailability,
    getOneProduct,
};
