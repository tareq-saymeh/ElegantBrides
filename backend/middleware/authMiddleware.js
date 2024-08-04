const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const loginMiddleware = express.Router();
const cookieParser = require('cookie-parser');

// Set up session middleware
loginMiddleware.use(cookieParser());

// Set session data
const setSession = (req, userData) => {
  req.session.role = userData.model;
  req.session.user_id = userData.user._id;
};

// Destroy session
const destroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Failed to log out' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    }
  });
};

// Authentication middleware
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    const user = await User.findById(req.user) || await Admin.findById(req.user);
    if (!user) {
      return res.status(401).json({ error: 'Authorization denied' });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { auth, setSession, destroySession, loginMiddleware };
