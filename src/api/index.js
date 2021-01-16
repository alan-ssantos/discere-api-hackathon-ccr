const { Router } = require('express');

const user = require('./routes/user');
const login = require('./routes/login');

module.exports = () => {
  const router = Router();

  router.head('/', async (req, res) => res.status(200).send());

  user(router);
  login(router);

  return router;
};
