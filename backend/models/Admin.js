const mongoose = require('mongoose');


const Admin = mongoose.model('Admin', new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken:{type:String},
  resetPasswordExpires:{type:Date}
    })
)
module.exports = Admin;