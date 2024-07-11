const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName: { type: String, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    birthDay: { type: Date, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}));

module.exports = User;
