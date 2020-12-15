const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

UserSchema.virtual('totalAds', {
  ref: 'Ad', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'user', // is equal to `foreignField`
  count: true // And only get the number of docs
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(pass) {
    return bcrypt.compare(pass, this.password);
  },
};

module.exports = mongoose.model('User', UserSchema);
