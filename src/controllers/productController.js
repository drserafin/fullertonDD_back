const Product = require('../models/productModel');
const { Op } = require('sequelize');

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

const createProduct = async (req, res) => {
    console.log('Request body:', req.body); // Log the incoming request body
    try {
        const { name, description, price, category, stock_quantity, available } = req.body;

        // Check if images were uploaded
        if (!req.body.images || req.body.images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded.' });
        }

        // Create a new product instance
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock_quantity,
            available,
            image_url: req.body.images // Store all image URLs in the database
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error.message); // Log the error message
        console.error(error.stack); // Log the stack trace for more context
        res.status(500).json({ message: 'Server error', error: error.message }); // Return the error message in response
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

// Function to delete images from S3
const deleteImageFromS3 = async (imageName) => {
    const params = {
        Bucket: 'fullerton-deal-depot-product-images', // Your S3 bucket name
        Key: imageName.split('/').pop(), // Extract just the filename from the URL
    };

    try {
        await s3.deleteObject(params); // Delete the image from S3
        console.log(`Deleted image: ${imageName}`);
    } catch (error) {
        console.error('Error deleting image from S3:', error);
        throw new Error('Error deleting image from S3');
    }
};

// Function to delete a product by ID and its associated images from S3
const deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        // Find the product by ID
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get the list of image URLs from the product
        const imageUrls = product.image_url; // Assuming `image_url` contains the array of image URLs

        // Delete each image from S3
        for (const imageUrl of imageUrls) {
            await deleteImageFromS3(imageUrl);
        }

        // Delete the product from the database
        await Product.destroy({ where: { id: productId } });

        res.status(200).json({ message: 'Product and associated images deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock_quantity, available, imageUrls } = req.body;

    console.log('Updating product with ID:', id);
    console.log('Incoming data:', req.body);
    
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock_quantity = stock_quantity !== undefined ? stock_quantity : product.stock_quantity;
        product.available = available !== undefined ? available : product.available;

        // Update images if provided
        if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
            product.image_url = imageUrls; // Replace existing image URLs
        }

        await product.save(); // Save the updated product

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    searchProducts,
    listProductIdsAndNames,
    updateStockAndAvailability,
    getOneProduct,
    deleteProductById,
    updateProduct,
};
