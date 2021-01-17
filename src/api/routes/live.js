const { Router } = require('express');
const liveService = require('../../services/liveService');
const { ErrorHandler } = require('../../utils/error');
const auth = require('../middlewares/auth');

const route = Router();

module.exports = (router) => {
  router.use('/lives', route);

  route.get('/', async (req, res, next) => {
    try {
      const lives = await liveService.index();

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        lives,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const live = await liveService.detail(id);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        live,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { title, description, date, cover } = req.body;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const live = await liveService.create(userId, date, title, description, cover);

      return res.status(201).json({
        status: 'Created',
        statusCode: 201,
        live,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/:id/start', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { id } = req.params;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const { liveStatus, live } = await liveService.start(userId, id);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        liveStatus,
        live,
      });
    } catch (error) {
      return next(error);
    }
  });

  route.post('/:id/end', auth, async (req, res, next) => {
    try {
      const { userRole, userId } = req;
      const { id } = req.params;

      if (userRole !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

      const { liveStatus, live } = await liveService.end(userId, id);

      return res.status(200).json({
        status: 'OK',
        statusCode: 200,
        liveStatus,
        live,
      });
    } catch (error) {
      return next(error);
    }
  });
};
