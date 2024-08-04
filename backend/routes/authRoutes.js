const express = require('express');
const { register, login, logout, getSession } = require('../controllers/authController');

const router = express.Router();

// User registration route
router.post('/register', register);

// User/Admin login route
router.post('/login', login);

// Get session route
router.get('/getSession', getSession);

// User/Admin logout route
router.post('/logout', logout);

module.exports = router;
