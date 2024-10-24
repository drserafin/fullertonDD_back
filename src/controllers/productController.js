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

const listProductIdsAndNames = async (req, res) => {
    try {
        // Fetch all products, selecting only id and name
        const products = await Product.findAll({
            attributes: ['id', 'name'] // Select only the id and name columns
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products); // Return the list of product ids and names
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

// Function to resize the image
const resizeImage = async (filePath) => {
    await sharp(filePath)
        .resize(1000, 1000) // Resize to 1000x1000 pixels
        .toFile(path.join(__dirname, '../uploads', path.basename(filePath))); // Save resized image to the uploads folder
};

const deleteProductById = async (req, res) => {
    console.log('Delete request received for ID:', req.params.id); // Debug log

    const { id } = req.params; // Correctly get the id from req.params

    try {
        const product = await Product.findByPk(id); // Find the product by its ID

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy(); // Delete the product
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};



const updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters
    const { name, description, price, category, stock_quantity, available } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : null;

    console.log('Updating product with ID:', id);
    console.log('Incoming data:', req.body);
    
    try {
        const product = await Product.findByPk(id); // Find the product by its ID
        console.log('Found product:', product); // Log the found product

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Log current product details before making updates
        console.log('Current product details:', product.toJSON());

        // Update product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock_quantity = stock_quantity !== undefined ? stock_quantity : product.stock_quantity;
        product.available = available !== undefined ? available : product.available;

        // Update images if provided
        if (images) {
            // Concatenate existing images with new images
            product.image_url = [...product.image_url, ...images]; // Ensure image_url can store multiple URLs
        }

        await product.save(); // Save the updated product

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error); // Log any errors
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};



module.exports = {
    getAllProducts,
    createProduct,
    searchProducts,
    listProductIdsAndNames,
    uploadImage, // Ensure uploadImage is exported
    updateStockAndAvailability,
    getOneProduct,
    deleteProductById,
    updateProduct,
};
