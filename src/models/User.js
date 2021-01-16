const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const options = { discriminatorKey: 'role' };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  picture: String,
  gender: {
    type: String,
    default: 'other',
  },
  birthday: String,
  address: {
    state: String,
    city: String,
  },
}, options);

userSchema.pre('save', async function callback(next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

userSchema.methods.generateToken = function callback() {
  return jwt.sign(
    {
      id: this.id,
      role: this.role,
    },
    config.jwtSecret,
    { expiresIn: '7d' },
  );
};

module.exports = mongoose.model('User', userSchema);
