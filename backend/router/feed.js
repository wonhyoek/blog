const express = require('express');
const router = express.Router();
const FeedController = require('../controller/feed');
const Auth = require('../middleware/auth');

router.post('/', Auth, FeedController.create);
router.get('/', FeedController.read);
router.get('/:id', FeedController.readById);
router.put('/:id', FeedController.update);
router.delete('/:id', FeedController.delete);

module.exports = router;