const express = require('express');
const router = express.Router();
const FeedController = require('../controller/feed');
const Auth = require('../middleware/auth');



/**
 * @swagger
 * tags:
 *  name: Feeds
 *  description: Feed managing API
 */

 /**
  * @swagger
  * /api/feeds:
  *  post:
  *     summary: create feed
  *     tags: [Feeds]
  *     requestBody:
  *         required: true
  *         content:
  *             application/json:
  *                 schema:
  *                     type: object
  *                     required:
  *                         - title
  *                         - content
  *                         - author
  *                     properties:
  *                         title:
  *                             type: string
  *                         content:
  *                             type: string
  *                         author:
  *                             type: string
  *     responses:
  *         200:
  *             description: feed has successfully been created
  *             content:
  *                 application/json:
  *                     schema:
  *                         type: object
  *                         required:
  *                             - success
  *                             - feedId
  *                         properties:
  *                             success:
  *                                 type: boolean
  *                             feedId:
  *                                 type: string
  *                                                                                                                                   
  */

router.post('/', Auth, FeedController.create);
router.get('/', FeedController.read);
router.get('/:id', FeedController.readById);
router.put('/:id', FeedController.update);
router.delete('/:id', FeedController.delete);

module.exports = router;