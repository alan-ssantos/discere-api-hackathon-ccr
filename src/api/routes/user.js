const { Router } = require('express');
const userService = require('../../services/userService');

const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', async (req, res, next) => {
    try {
      const users = await userService.index();

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        users,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.detail(id);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        user,
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

      const user = await userService.create(name, email, password, role);

      return res.status(201).json({
        status: 'Created',
        statusCode: 201,
        user,
      });
    } catch (error) {
      return next(error);
    }
  });
};
