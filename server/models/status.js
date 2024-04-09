const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Status', statusSchema);