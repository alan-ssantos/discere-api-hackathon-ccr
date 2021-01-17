const User = require('../models/User');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

const { ErrorHandler } = require('../utils/error');

module.exports = {
  async index(params = {}) {
    const users = await User.find(params, '-email');

    const nUsers = users.map((u) => u.toObject());
    return nUsers;
  },

  async detail(id) {
    const user = await User.findById(id, '-email');

    return user.toObject();
  },

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

    const token = await user.generateToken();

    return {
      user: user.toObject(),
      token,
    };
  },
};
