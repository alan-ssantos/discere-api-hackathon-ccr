const { Router } = require('express');
const auth = require('../middlewares/auth');

const route = Router();

module.exports = (router) => {
  router.use('/login', route);

  route.post('/', auth, async (req, res, next) => {
    try {
      console.log(req.userRole);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  });
};
