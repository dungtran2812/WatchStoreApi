const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

// Register new user
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

// Get user profile (protected route)
router.get('/profile', UserController.authenticateToken, UserController.getProfile);

module.exports = router;
