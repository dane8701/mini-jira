const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  priority: { type: Number, required: true, unique: true },
  tags: { type: [String], required: true, unique: true },

  created_at: { type: Date, required: true, default: Date.now() },
  expired_at: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model('Projects', projectsSchema);