const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Auth = require('../middleware/auth');

router.post('/', UserController.create);
router.post('/user/login', UserController.login);
router.get('/user/auth', Auth, UserController.auth);
router.get('/user/logout', Auth, UserController.logout);

module.exports = router;