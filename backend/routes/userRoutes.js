const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');

// Route to get all users
router.get('/all', getAllUsers);

module.exports = router;
