// controllers/cartController.js
const { Cart } = require('../models');

// Get cart for a specific user
const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId }, // or use cartId if provided in the URL
      include: 'CartItems', // Include the associated CartItems
    });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart', error: err });
  }
};

// Create a new cart (for a non-logged-in user or new user)
const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart', error: err });
  }
};

// Delete a cart (usually when a user logs out or abandons the cart)
const deleteCart = async (req, res) => {
  try {
    const deleted = await Cart.destroy({
      where: { cartId: req.params.cartId },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cart', error: err });
  }
};

module.exports = {
  getCartByUser,
  createCart,
  deleteCart,
};
