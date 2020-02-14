const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Helicopter = new Schema({
  id: ObjectId,
  name: String,
  serial: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Helicopter', Helicopter);