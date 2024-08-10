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

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Set user id to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


module.exports = { auth, setSession, destroySession, loginMiddleware };
