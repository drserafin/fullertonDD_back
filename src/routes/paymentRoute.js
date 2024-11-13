const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get payments by user
router.get('/:userId', paymentController.getPaymentsByUser);

// Create a new payment
router.post('/', paymentController.createPayment);

// Update a payment
router.put('/:paymentId', paymentController.updatePayment);

// Delete a payment
router.delete('/:paymentId', paymentController.deletePayment);

module.exports = router;
