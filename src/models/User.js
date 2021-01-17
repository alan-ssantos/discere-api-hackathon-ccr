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
    select: false,
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
  subscriptions: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Live',
    }],
  },
}, options);

userSchema.set('toObject', {
  getters: true,
  transform: (doc, ret, options) => {
    const aux = ret;
    delete aux._id;
    delete aux.__v;
    delete aux.password;

    return aux;
  },
});

userSchema.pre('save', async function callback(next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

userSchema.methods.checkPassword = async function fn(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

userSchema.methods.generateToken = function fn() {
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
