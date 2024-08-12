// routes/cartRoutes.js
const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { getCart, addItemToCart, removeItemFromCart,confirmCart } = require('../controllers/cartController');
const router = express.Router();

// GET /api/cart
router.get('/', auth, getCart);

// POST /api/cart/add
router.post('/add', auth, addItemToCart);

// POST /api/cart/confirm
router.post('/confirm', auth, confirmCart);

// DELETE /api/cart/:itemId
router.delete('/:itemId', auth, removeItemFromCart);

module.exports = router;
