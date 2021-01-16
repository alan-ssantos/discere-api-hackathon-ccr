const mongoose = require('mongoose');
const User = require('./utils/User');

const mentorSchema = mongoose.Schema({
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
