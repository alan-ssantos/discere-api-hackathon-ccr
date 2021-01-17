const { Router } = require('express');
const categoryService = require('../../services/categoryService');
const { ErrorHandler } = require('../../utils/error');
const auth = require('../middlewares/auth');

const route = Router();

module.exports = (router) => {
  router.use('/categories', route);

  route.get('/', async (req, res, next) => {
    try {
      const category = await categoryService.index();

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        category,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', auth, async (req, res, next) => {
    try {
      const { userRole } = req;
      const { title, description } = req.body;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const category = await categoryService.create(title, description);

      return res.status(201).json({
        status: 'Created',
        statusCode: 201,
        category,
      });
    } catch (error) {
      return next(error);
    }
  });
};
