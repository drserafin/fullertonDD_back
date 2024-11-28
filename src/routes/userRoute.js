const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user (only email required)
router.post('/login', userController.loginUser);

module.exports = router;