// controllers/cartController.js

const Cart = require('../models/Cart');

// Get cart items
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate('itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { itemId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user });
    if (!cart) {
      cart = new Cart({ userId: req.user, itemId: [itemId] });
    } else {
      cart.itemId.push(itemId);
    }
    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.updateOne({ userId: req.user }, { $pull: { itemId: id } });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeCartItem,
};
