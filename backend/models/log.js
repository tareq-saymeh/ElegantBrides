const mongoose = require('mongoose');

const Log = mongoose.model('Log', new mongoose.Schema({
    itemId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' }],
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
    }
}));

module.exports = Log;
