const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

module.exports = mongoose.model('Category', categorySchema);
