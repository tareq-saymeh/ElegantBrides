const mongoose = require('mongoose');

const Items = mongoose.model('Items', new mongoose.Schema({
    name: { type: String, required: true, trim: true , min:0,max:50},
    size: { type: String, trim: true },
    brand: { type: String, trim: true },
    color: { type: String, trim: true },
    description: { type: String, trim: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['Accessories', 'Jewelry', 'Flower', 'Veils', 'WeddingDress', 'Shoes'] 
    },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5 }
}));

module.exports = Items;
