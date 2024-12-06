const { CartItem, Cart, Product } = require('../models');

// Add product to the cart
async function addItemToCart(req, res) {
  const cartId = req.cartId;  // Get cartId from session or cookie
  const { productId, quantity } = req.body;  // Get productId and quantity from the request body
  
  try {
    // Check if the cart exists in the database
    let cart = await Cart.findOne({ where: { cart_id: cartId } });

    if (!cart) {
      // If no cart exists, create a new cart associated with the user
      cart = await Cart.create({ user_id: req.userId });  // Ensure cart is associated with logged-in user
    }

    // Find the product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the cart
    const existingItem = await CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id: product.id }
    });

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      // Otherwise, add a new item to the cart
      await CartItem.create({
        cart_id: cart.cart_id,
        product_id: product.id,
        quantity: quantity,
        price: product.price  // Store the price of the product at the time of adding it to the cart
      });
    }

    res.status(200).json({ message: 'Product added to cart', cartId: cart.cart_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to cart', error });
  }
}

// Remove product from the cart
const removeItemFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const deleted = await CartItem.destroy({
      where: { cart_id: cartId, product_id: productId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error removing product from cart', error: err });
  }
};

// Update product quantity in the cart
const updateItemQuantity = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    // Find the cart item by cartId and productId
    const cartItem = await CartItem.findOne({
      where: { cart_id: cartId, product_id: productId }
    });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating quantity', error: err });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
};
