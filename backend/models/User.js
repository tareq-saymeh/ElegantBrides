const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    Phone:{type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    birthday: { type: Date, required: true },
    // resetPasswordToken: { type: String },
    // resetPasswordExpires: { type: Date }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
