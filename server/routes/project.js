const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const projectCtrl = require('../controllers/projects/crud');

router.post('/', auth, projectCtrl.createProject);

router.put('/:id', auth, projectCtrl.modifyProject);

router.delete('/:id', auth, projectCtrl.deleteProject);

router.get('/:id', projectCtrl.getOneProject);

router.get('/', projectCtrl.getAllProjects);

module.exports = router;