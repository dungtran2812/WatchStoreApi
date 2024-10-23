const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Updated to use User model
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY; // Use a strong secret key for production

class UserController {
  // Register new user
  static async register(req, res) {
    const { username, password } = req.body;

    try {
      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: 'Username already registered' });

      const newUser = new User({ username, password });
      const savedUser = await newUser.save();

      res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // User login
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid username or password' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, username });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get user profile (protected route)
  static async getProfile(req, res) {
    try {
      console.log(req.user)
      const user = await User.findById(req.user.userId).select('-password'); // Exclude password
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Middleware to authenticate token
  static authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No authorization header found');
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part after "Bearer"
  
  if (!token) {
    console.log('No token provided after Bearer');
    return res.status(401).json({ message: 'Access denied' });
  }

  console.log('Token received:', token); // Log the token received

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err); // Log the error
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

}

module.exports = UserController;
