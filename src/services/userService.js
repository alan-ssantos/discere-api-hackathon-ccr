const User = require('../models/User');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

const { ErrorHandler } = require('../utils/error');

module.exports = {
  async create(name, email, password, role) {
    let user;

    user = await User.findOne({ email });
    if (user) throw new ErrorHandler(400, 'Este endereço de e-mail já está em uso.');

    if (role === 'mentor') {
      user = await Mentor.create({ name, email, password });
    } else {
      user = await Student.create({ name, email, password });
    }

    if (!user) throw new ErrorHandler(500, 'Não foi possível cadastrar o usuário.');

    const token = user.generateToken();

    return {
      user: user.toObject(),
      token,
    };
  },

  async findAll(params = {}) {
    const users = await User.find(params);

    return users;
  },

  async findById(id) {
    const user = await User.findById(id);

    return user;
  },
};
