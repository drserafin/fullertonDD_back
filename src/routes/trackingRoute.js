const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

// Get tracking details for an order
router.get('/:orderNo', trackingController.getTrackingDetailsForOrder);

// Create a new tracking detail
router.post('/', trackingController.createTrackingDetail);

// Update tracking detail
router.put('/:id', trackingController.updateTrackingDetail);

// Delete a tracking detail
router.delete('/:id', trackingController.deleteTrackingDetail);

module.exports = router;
