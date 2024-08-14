const express = require('express');
const router = express.Router();
const { getAllUsers, getSavedItems,updateUser } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

// Route to get all users
router.get('/all', getAllUsers);

// Route to get user saved items
router.get('/saved', auth, getSavedItems);

// Update user info
router.put('/update', auth, updateUser);

module.exports = router;
