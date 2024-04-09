const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  priority: { type: Number, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now() },

  master_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  rapporter: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model('Tasks', tasksSchema);