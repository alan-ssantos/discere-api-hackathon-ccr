const Category = require('../models/Category');
const { ErrorHandler } = require('../utils/error');

module.exports = {
  async index() {
    const categories = await Category.find();

    return categories;
  },

  async create(title, description) {
    let category;
    category = await Category.findOne({ title });

    if (category) throw new ErrorHandler(400, 'Está categoria já existe.');

    category = await Category.create({ title, description });
    if (!category) throw new ErrorHandler(500, 'Não foi possível cadastrar esta categoria');

    return category;
  },
};
