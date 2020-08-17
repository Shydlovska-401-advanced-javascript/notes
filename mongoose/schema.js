'use strict';

const mongoose = require('mongoose');

const noteModel = mongoose.Schema({
  category: { type: String, default: 'general', required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteModel);