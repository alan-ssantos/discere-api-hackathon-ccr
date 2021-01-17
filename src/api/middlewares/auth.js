const jwt = require('jsonwebtoken');
const config = require('../../config');
const { ErrorHandler } = require('../../utils/error');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorHandler(401, 'O token de autenticação não foi fornecido.');

    const parts = authorization.split(' ');
    const [scheme, token] = parts;
    if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
      throw new ErrorHandler(401, 'O token de autenticação mal-formado.');
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) throw new ErrorHandler(401, 'O token de autenticação inválido.');

      req.userId = decoded.id;
      req.userRole = decoded.role;
    });

    return next();
  } catch (error) {
    if (!error.status) error.status = 500;
    return next(error);
  }
};
