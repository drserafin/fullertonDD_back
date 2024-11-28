const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user (only email required)
router.post('/login', userController.loginUser);
router.get('/list', userController.getUsers);
router.get('/token/:username', userController.getTokenByUsername);
router.get('/username', userController.getUsernameByToken);

module.exports = router;