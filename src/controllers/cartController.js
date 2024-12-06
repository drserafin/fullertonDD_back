const { Cart, CartItem } = require('../models');

// Get cart for a specific user
const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.params.userId },  // Match user_id field correctly
      include: {
        model: CartItem,  // Include CartItems
        as: 'cartItems',  // Alias should match the one defined in the model
      },
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
    // Check if user_id is provided in the request body
    if (!req.body.user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newCart = await Cart.create({
      user_id: req.body.user_id,  // Ensure user_id is passed correctly
    });
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart', error: err });
  }
};

// Delete a cart (usually when a user logs out or abandons the cart)
const deleteCart = async (req, res) => {
  try {
    const deleted = await Cart.destroy({
      where: { cart_id: req.params.cartId },  // Make sure cartId is passed correctly in the URL
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
