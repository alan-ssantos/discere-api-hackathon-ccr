const { Router } = require('express');
const userService = require('../../services/userService');

const route = Router();

module.exports = (app) => {
  app.use('/user', route);

  route.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await userService.findById(id);

      return res.status(201).json({
        result,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', async (req, res, next) => {
    try {
      const {
        name, email, password, role,
      } = req.body;

      const result = await userService.create(name, email, password, role);

      return res.status(201).json({
        message: 'Created',
        result,
      });
    } catch (error) {
      return next(error);
    }
  });
};
