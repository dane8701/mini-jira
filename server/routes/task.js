const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskCtrl = require('../controllers/tasks/crud');

router.post('/', auth, taskCtrl.createTask);

router.put('/:id', auth, taskCtrl.modifyTask);

router.delete('/:id', auth, taskCtrl.deleteTask);

router.get('/:id', taskCtrl.getOneTask);

router.get('/', taskCtrl.getAllTasks);

module.exports = router;