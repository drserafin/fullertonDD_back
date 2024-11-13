const { Order, Product, OrderItem } = require('../models');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving orders', error: err });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving orders for user', error: err });
  }
};

// Get a specific order, including products
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{ model: Product, through: OrderItem }] // Ensure the association with OrderItem is properly set up
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving order', error: err });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, { where: { id: req.params.orderId } });
    if (updated === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.orderId } });
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
