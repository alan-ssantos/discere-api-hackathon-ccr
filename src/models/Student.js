const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  interests: [{
    title: {
      type: String,
      required: true,
    },
  }],
});

module.exports = User.discriminator('student', studentSchema);
