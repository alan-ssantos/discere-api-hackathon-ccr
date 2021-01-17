const { Router } = require('express');
const liveService = require('../../services/liveService');
const { ErrorHandler } = require('../../utils/error');
const auth = require('../middlewares/auth');

const route = Router();

module.exports = (router) => {
  router.use('/live', route);

  route.post('/', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { title, description, date } = req.body;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const result = await liveService.create(userId, date, title, description);

      return res.status(201).json({ result });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/:id/start', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { id } = req.params;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const result = await liveService.start(userId, id);

      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/:id/end', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { id } = req.params;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const result = await liveService.end(userId, id);

      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  });
};
