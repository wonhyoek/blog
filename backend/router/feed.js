const express = require('express');
const router = express.Router();
const FeedController = require('../controller/feed');
const Auth = require('../middleware/auth');

router.post('/', Auth, FeedController.create);
router.get('/', FeedController.read);

module.exports = router;