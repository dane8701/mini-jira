const Project = require('../../models/projects');

exports.createProject = (req, res, next) => {
  const projectObject = req.body.project;
  delete projectObject._id;
  const project = new Project({
    ...projectObject,
  });
  project.save()
    .then(() => res.status(201).json({ message: 'Project save !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyProject = (req, res, next) => {
  const projectObject = req.body.project;
  Project.updateOne({ _id: req.params.id }, { ...projectObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: `Project ${req.params.id} modify !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProject = (req, res, next) => {
  Project.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: `Project ${req.params.id} deleted !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneProject = (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then( project => res.status(200).json(project))
    .catch(error => res.status(400).json({error}));
};

exports.getAllProjects = (req, res, next) => {
  Project.find()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(400).json({error}));
};