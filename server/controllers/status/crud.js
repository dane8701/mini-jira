const Status = require('../../models/status');

exports.createStatus = (req, res, next) => {
  const statusObject = req.body;
  delete statusObject._id;
  const status = new Status({
    ...statusObject,
  });
  status.save()
    .then(() => res.status(201).json({ message: 'Status save !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyStatus = (req, res, next) => {
  const statusObject = req.body;
  Status.updateOne({ _id: req.params.id }, { ...statusObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: `Status ${req.params.id} modify !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteStatus = (req, res, next) => {
  Status.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: `Status ${req.params.id} deleted !`}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneStatus = (req, res, next) => {
  Status.findOne({ _id: req.params.id })
    .then( status => res.status(200).json(status))
    .catch(error => res.status(400).json({error}));
};

exports.getAllStatuss = (req, res, next) => {
  Status.find()
    .then(statuss => res.status(200).json(statuss))
    .catch(error => res.status(400).json({error}));
};