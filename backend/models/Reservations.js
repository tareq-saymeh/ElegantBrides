const mongoose = require('mongoose');

const Reservations = mongoose.model('Reservations', new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' }],  // Allow multiple items
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    receivedDate: { type: Date, required: true },
    returnDate: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(value) {
                return value > this.receivedDate;
            },
            message: 'Return date must be after received date'
        }
    },
    isReceived: { type: Boolean, default: false },  // Track if the customer has received the item(s)
}));

module.exports = Reservations;
