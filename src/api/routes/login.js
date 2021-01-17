const { Router } = require('express');

const auth = require('../middlewares/auth');
const userService = require('../../services/userService');

const route = Router();

module.exports = (router) => {
  router.use('/login', route);

  route.post('/', auth, async (req, res, next) => {
    try {
      const result = await userService.findById(req.userId);

      return res.status(200).json({
        result,
      });
    } catch (error) {
      return next(error);
    }
  });
};
