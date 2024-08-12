const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' , required: true}, // Reference to Item
        quantity: { type: Number,  min: 1, default: 1 }, // Quantity for the item
        receivedDate: { type: Date },
    returnDate: { 
        type: Date, 
        validate: {
            validator: function(value) {
                return value > this.receivedDate;
            },
            message: 'Return date must be after received date'
        }}
    }],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isReceived: { type: Boolean, default: false },  // Track if the customer has received the item(s)
});

const Reservations = mongoose.model('Reservations', reservationSchema);

module.exports = Reservations;
