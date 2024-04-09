const Task = require('../../models/tasks');

exports.createTask = (req, res, next) => {
  const taskObject = req.body.task;
  delete taskObject._id;
  const task = new Task({
    ...taskObject,
  });
  task.save()
    .then(() => res.status(201).json({ message: 'Task save !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyTask = (req, res, next) => {
  const taskObject = req.body.task;
  Task.updateOne({ _id: req.params.id }, { ...taskObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: `Task ${req.params.id} modify !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteTask = (req, res, next) => {
  Task.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: `Task ${req.params.id} deleted !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneTask = (req, res, next) => {
  Task.findOne({ _id: req.params.id })
    .then( task => res.status(200).json(task))
    .catch(error => res.status(400).json({error}));
};

exports.getAllTasks = (req, res, next) => {
  Task.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(400).json({error}));
};