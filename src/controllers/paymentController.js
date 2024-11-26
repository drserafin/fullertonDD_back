const { Payment } = require('../models');  // Import Payment model

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payments', error: err });
  }
};

// Get payments by user
const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { userId: req.params.userId } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payments for user', error: err });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment', error: err });
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.update(req.body, { where: { paymentId: req.params.paymentId } });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment', error: err });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.destroy({ where: { paymentId: req.params.paymentId } });
    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment', error: err });
  }
};

module.exports = {
  getAllPayments,
  getPaymentsByUser,
  createPayment,
  updatePayment,
  deletePayment
};