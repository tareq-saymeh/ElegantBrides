const mongoose = require('mongoose');
const Reservations = require('./Reservations');

// Define the Cart schema
const cartSchema = new mongoose.Schema({
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to Item
        quantity: { type: Number, required: true, min: 1, default: 1 }, // Quantity for the item
        receivedDate: { type: Date },
        returnDate: { 
            type: Date, 
            validate: {
                validator: function(value) {
                    return value > this.receivedDate;
                },
                message: 'Return date must be after received date'
            }
        }
    }],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    confirm: { type: Boolean, default: false },  // Track if the customer has received the item(s)
});

// Add a pre-save middleware to the Cart schema
cartSchema.pre('save', async function(next) {
    // Check if confirm is true and only proceed if it's true
    if (this.confirm) {
        try {
            // Create a new reservation
            const newReservation = new Reservations({
                userId: this.userId,
                items: this.items,
            });

            // Save the reservation
            await newReservation.save();

            // Clear the cart after moving to reservations
            this.items = [];  // Clear items
            this.confirm = false;  // Reset confirm to false
        } catch (error) {
            return next(error);
        }
    }

    next();
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
