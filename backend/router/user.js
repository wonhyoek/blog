const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Auth = require('../middleware/auth');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.post('/profile-image', UserController.uploadUserimage);
router.put('/profile-image', Auth, UserController.updateUserimage);
router.get('/auth', Auth, UserController.auth);
router.get('/logout', Auth, UserController.logout);
router.get('/:id', UserController.userById);


module.exports = router;