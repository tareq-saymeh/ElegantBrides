// routes/cartRoutes.js

const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { getCart, addItemToCart, removeCartItem } = require('../controllers/cartController');
const router = express.Router();

// GET /api/cart
router.get('/', auth, getCart);

// POST /api/cart/add
router.post('/add', auth, addItemToCart);

// DELETE /api/cart/:id
router.delete('/:id', auth, removeCartItem);

module.exports = router;
