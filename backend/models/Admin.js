const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}));

module.exports = Admin;
