const { Router } = require('express');

const mentor = require('./routes/mentor');

module.exports = () => {
  const router = Router();

  router.head('/', async (req, res) => res.status(200).send());

  mentor(router);

  return router;
};
