const { Cart, Product } = require('../models');

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving carts', error: err });
  }
};

// Get cart for a specific user
const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      where: { userId: req.params.userId },
      include: Product 
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart for user', error: err });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart', error: err });
  }
};

// Update a cart (e.g., add/remove products)
const updateCart = async (req, res) => {
  try {
    const updated = await Cart.update(req.body, { where: { cartId: req.params.cartId } });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  try {
    const deleted = await Cart.destroy({ where: { cartId: req.params.cartId } });
    if (!deleted) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cart', error: err });
  }
};

module.exports = {
  getAllCarts,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart
};
