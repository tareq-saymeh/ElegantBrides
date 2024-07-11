const mongoose = require('mongoose');

const Items = mongoose.model('Items', new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String },
    brand: { type: String},
    description: { type: String},
    type :{ type: String , required: true}, // Accessories Jewerly Flower Veils WeddingDress Shoes
    price : { type: Number , required: true},
    rating : { type: Number },
    })
)
module.exports = Items;