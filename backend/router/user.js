const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Auth = require('../middleware/auth');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/auth', Auth, UserController.auth);

module.exports = router;