const Product = require('../models/Product');
const { Op } = require('sequelize'); // Import Sequelize operators

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

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to search products
const searchProducts = async (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the request
  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { description: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the functions you want to use
module.exports = {
  getAllProducts,
  createProduct,
  searchProducts,
};
