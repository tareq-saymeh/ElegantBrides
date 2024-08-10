const mongoose = require('mongoose');

const Cart = mongoose.model('Cart', new mongoose.Schema({
    itemId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' }],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}));

module.exports = Cart;
