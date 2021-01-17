const mongoose = require('mongoose');
const User = require('./User');

const mentorSchema = new mongoose.Schema({
  education: [{
    title: {
      type: String,
      required: true,
    },
  }],
  job: [{
    title: {
      type: String,
      required: true,
    },
  }],
});

module.exports = User.discriminator('mentor', mentorSchema);
