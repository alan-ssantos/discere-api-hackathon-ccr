const Mentor = require('../models/Mentor');

module.exports = {
  async create(name, email, password) {
    const education = { title: 'Advogado' };
    const mentor = await Mentor.create({ name, email, password, education });

    return mentor.toObject();
  },
};
