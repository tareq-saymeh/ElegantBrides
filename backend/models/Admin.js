const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const adminSchema =  new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
})

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  const Admin = mongoose.model('Admin', adminSchema);

  module.exports = Admin;
  