    const mongoose = require('mongoose');

    const itemSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true, 
            trim: true, 
            maxlength: 50 
        },
        size: { 
            type: String, 
            trim: true 
        },
        brand: { 
            type: String, 
            trim: true 
        },
        color: { 
            type: String, 
            trim: true 
        },
        BuyAble: { 
            type: Boolean 
        },
        RentAble: { 
            type: Boolean 
        },
        description: { 
            type: String, 
            trim: true 
        },
        type: { 
            type: String, 
            required: true, 
            enum: ['Accessories', 'Jewelry', 'Flower', 'Veils', 'WeddingDress', 'Shoes'] 
        },
        price: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        quantity: { 
            type: Number, 
            required: true, 
            default:1,
            min: 0 // Ensures that quantity cannot be negative
        },
        image: { 
            type: [String], // Store the URL or file path of the image
            trim: true
        }
    });

    const Item = mongoose.model('Item', itemSchema);

    module.exports = Item;
