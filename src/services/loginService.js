const User = require('../models/User');
const { ErrorHandler } = require('../utils/error');

module.exports = {
  async login(email, password) {
    const user = await User.findOne({ email }, '+password');
    if (!user) throw new ErrorHandler(400, 'Endereço de email ou senha estão incorretos.');

    const compare = await user.checkPassword(password);
    if (!compare) throw new ErrorHandler(400, 'Endereço de email ou senha estão incorretos.');

    const token = await user.generateToken();

    return {
      user: user.toObject(),
      token,
    };
  },

  async checkEmail(email) {
    const user = await User.findOne({ email });

    return !!user;
  },
};
