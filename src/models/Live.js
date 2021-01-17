const mongoose = require('mongoose');

const liveSchema = mongoose.Schema({
  channelName: String,
  channelToken: String,
  title: String,
  description: String,
  date: Date,
  cover: {
    type: String,
    default: 'https://res.cloudinary.com/duosrc/image/upload/v1610919840/04.png',
  },
  started: {
    type: Boolean,
    default: false,
  },
  ended: {
    type: Boolean,
    default: false,
  },
  mentor: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }],
  },
});

liveSchema.set('toObject', {
  getters: true,
  transform: (doc, ret, options) => {
    const aux = ret;
    aux.date = new Date(ret.date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

    return aux;
  },
});

module.exports = mongoose.model('Live', liveSchema);
