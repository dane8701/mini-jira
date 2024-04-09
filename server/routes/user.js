const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users/all');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/send', userCtrl.sendMail);

module.exports = router;