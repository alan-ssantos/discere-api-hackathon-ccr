const { Router } = require('express');
const MentorService = require('../../services/mentorService');

const route = Router();

module.exports = (app) => {
  app.use('/mentor', route);

  route.post('/', async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const result = await MentorService.create(name, email, password);
      if (!result) { throw new Error('Error when registering the mentor'); }

      return res.status(201).json({
        result,
      });
    } catch (error) {
      if (!error.status) error.status = 500;
      return next(error);
    }
  });
};
