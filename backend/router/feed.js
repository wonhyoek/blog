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

/**
 * @swagger
 * /api/feeds:
 *  get:
 *      summary: return list of feed
 *      tags: [Feeds]
 *      responses:
 *          200:
 *              description: The list of feed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - success
 *                              - feeds
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              feeds:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Feed'
 */
router.get('/', FeedController.read);

/**
 * @swagger
 * /api/feeds/{id}:
 *  get:
 *      summary: get feed by id
 *      tags: [Feeds]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: feed id
 *      responses:
 *          200:
 *              description: feed by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Feed'
 *          404:
 *              description: The book was not found
 */
router.get('/:id', FeedController.readById);
router.put('/:id', FeedController.update);
router.delete('/:id', FeedController.delete);

module.exports = router;