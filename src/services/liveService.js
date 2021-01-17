const { Types } = require('mongoose');

const User = require('../models/User');
const Live = require('../models/Live');
const { ErrorHandler } = require('../utils/error');
const agoraToken = require('../utils/agoraToken');

module.exports = {
  async index() {
    const lives = await Live.find();

    return lives;
  },

  async detail(id) {
    const live = await Live.findById(id);

    return live;
  },

  async create(userId, date, title, description, cover) {
    const user = await User.findById(userId);
    if (user.role !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

    const live = await Live.create({
      title, date, description, mentor: user.id, cover,
    });
    if (!live) throw new ErrorHandler(500, 'Não foi possível agendar a transmissão.');

    const expireTime = new Date(date).getTime();
    const channelName = String(Types.ObjectId());
    const channelToken = agoraToken(channelName, expireTime);

    live.channelName = channelName;
    live.channelToken = channelToken;
    live.save();

    return live.toObject();
  },

  async start(userId, liveId) {
    const user = await User.findById(userId, '-date');
    if (user.role !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

    const live = await Live.findById(liveId);
    if (!live) throw new ErrorHandler(400, 'Não foi possível encontrar a transmissão.');

    if (String(live.mentor) !== user.id) throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

    if (live.started) throw new ErrorHandler(400, 'Esta transmissão já foi iniciada.');
    if (live.ended) throw new ErrorHandler(400, 'Esta transmissão já foi encerrada.');

    live.started = true;
    await live.save();

    return {
      liveStatus: live.started ? 'Started' : 'Not started',
      live,
    };
  },

  async end(userId, liveId) {
    const user = await User.findById(userId);
    if (user.role !== 'mentor') throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

    const live = await Live.findById(liveId);
    if (!live) throw new ErrorHandler(400, 'Não foi possível encontrar a transmissão.');
    if (String(live.mentor) !== user.id) throw new ErrorHandler(403, 'Usuário sem permissões suficientes.');

    if (!live.started) throw new ErrorHandler(400, 'Esta transmissão ainda não foi iniciada.');
    if (live.ended) throw new ErrorHandler(400, 'Esta transmissão já foi encerrada.');

    live.ended = true;
    await live.save();

    return {
      liveStatus: live.started ? 'Ended' : 'Not ended',
      live,
    };
  },

};
