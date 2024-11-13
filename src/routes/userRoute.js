const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware for protected routes

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Get the user's profile (protected route, requires auth)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile (protected route, requires auth)
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
