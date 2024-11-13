const { TrackingDetail, Order } = require('../models');

// Get tracking details for an order
const getTrackingDetailsForOrder = async (req, res) => {
  try {
    const trackingDetails = await TrackingDetail.findAll({ where: { orderNo: req.params.orderNo } });
    
    if (trackingDetails.length === 0) {
      return res.status(404).json({ message: 'No tracking details found for this order.' });
    }

    res.json(trackingDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tracking details', error: err });
  }
};

// Create a new tracking detail
const createTrackingDetail = async (req, res) => {
  try {
    const { orderNo, trackingNumber, status, location } = req.body;

    // Validate input
    if (!orderNo || !trackingNumber || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the order exists
    const order = await Order.findByPk(orderNo);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create the tracking detail
    const newTrackingDetail = await TrackingDetail.create(req.body);
    res.status(201).json(newTrackingDetail);
  } catch (err) {
    res.status(500).json({ message: 'Error creating tracking detail', error: err });
  }
};

// Update tracking detail
const updateTrackingDetail = async (req, res) => {
  try {
    const [updated] = await TrackingDetail.update(req.body, { where: { id: req.params.id } });

    if (updated) {
      const updatedTrackingDetail = await TrackingDetail.findByPk(req.params.id);
      res.json(updatedTrackingDetail);
    } else {
      res.status(404).json({ message: 'Tracking detail not found for updating' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating tracking detail', error: err });
  }
};

// Delete a tracking detail
const deleteTrackingDetail = async (req, res) => {
  try {
    const deleted = await TrackingDetail.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(200).json({ message: 'Tracking detail deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tracking detail not found for deletion' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting tracking detail', error: err });
  }
};

module.exports = {
  getTrackingDetailsForOrder,
  createTrackingDetail,
  updateTrackingDetail,
  deleteTrackingDetail
};
