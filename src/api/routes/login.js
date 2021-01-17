const { Router } = require('express');
const loginService = require('../../services/loginService');

const route = Router();

module.exports = (router) => {
  router.use('/login', route);

  route.post('/', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginService.login(email, password);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        user,
        token,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/check', async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await loginService.checkEmail(email);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        hasUser: result,
      });
    } catch (error) {
      return next(error);
    }
  });
};
