const mongoose = require('mongoose');

const options = { discriminatorKey: 'role' };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
    enum: ['male', 'female', 'other'],
    default: 'other',
  },
  birthday: String,
  address: {
    state: String,
    city: String,
  },
}, options);

module.exports = mongoose.model('User', userSchema);
