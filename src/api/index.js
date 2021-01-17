const { Router } = require('express');

const user = require('./routes/user');
const live = require('./routes/live');
const login = require('./routes/login');
const category = require('./routes/category');

module.exports = () => {
  const router = Router();

  router.head('/', async (req, res) => res.status(200).send());

  user(router);
  live(router);
  login(router);
  category(router);

  return router;
};
