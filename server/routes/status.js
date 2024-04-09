const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const statusCtrl = require('../controllers/status/crud');

router.post('/', statusCtrl.createStatus);

router.put('/:id', auth, statusCtrl.modifyStatus);

router.delete('/:id', auth, statusCtrl.deleteStatus);

router.get('/:id', statusCtrl.getOneStatus);

router.get('/', statusCtrl.getAllStatuss);

module.exports = router;