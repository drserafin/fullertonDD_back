const { ShoppingSession, CartItem, Product } = require('../models');

// Create a new shopping session
exports.createSession = async (req, res) => {
  try {
    // Generate a unique session token, you can use a UUID or a random string
    const sessionToken = 'unique_token_here';  // Replace with actual token generation logic
    const session = await ShoppingSession.create({ session_token: sessionToken });

    res.status(201).json({ message: 'Shopping session created successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error creating shopping session', error });
  }
};

// Get details of a shopping session (like items in the cart)
exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Include CartItems and Product details in the response
    const session = await ShoppingSession.findByPk(sessionId, {
      include: {
        model: CartItem,
        as: 'cartItems',
        include: [{ model: Product, as: 'product' }],
      },
    });

    if (!session) {
      return res.status(404).json({ message: 'Shopping session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shopping session', error });
  }
};

// Add a product to the shopping session
exports.addProductToSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { productId, quantity } = req.body;

    // Ensure session exists before adding product
    const session = await ShoppingSession.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Shopping session not found' });
    }

    // Logic to add product to the cart
    const cartItem = await CartItem.create({ sessionId, productId, quantity });

    res.status(201).json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to session', error });
  }
};

// Remove a product from the shopping session
exports.removeProductFromSession = async (req, res) => {
  try {
    const { sessionId, productId } = req.params;

    // Check if session and product exist before deleting
    const session = await ShoppingSession.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Shopping session not found' });
    }

    const productInCart = await CartItem.findOne({ where: { sessionId, productId } });
    if (!productInCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Logic to remove product from the cart
    await CartItem.destroy({ where: { sessionId, productId } });
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from session', error });
  }
};

// Export the controller methods
module.exports = {
  createSession,
  getSession,
  addProductToSession,
  removeProductFromSession
};
