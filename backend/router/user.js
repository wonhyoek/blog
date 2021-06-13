const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Auth = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User managing api
 */


 /**
  * @swagger
  * /api/users:
  *     post:
  *         description: create user
  *         tags: [Users]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         type: object
  *                         required:
  *                             - email
  *                             - username
  *                             - password
  *                         properties:
  *                             email:
  *                                 type: string
  *                             username: 
  *                                 type: string
  *                             password:
  *                                 type: string
  *         responses:
  *             200:
  *                 description: user has been created
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: object
  *                             required:
  *                                 - success
  *                                 - data
  *                             properties:
  *                                 success:
  *                                     type: boolean
  *                                 data:
  *                                     type: boolean
  */

router.post('/', UserController.create);


/**
 * @swagger
 * /api/users/login:
 *  post:
 *      description: user login
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: login successed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required: 
 *                              - success
 *                              - isAuth
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              isAuth:
 *                                  type: boolean
 */
router.post('/login', UserController.login);



router.post('/profile-image', UserController.uploadUserimage);
router.put('/profile-image', Auth, UserController.updateUserimage);


/**
 * @swagger
 * /api/users/auth:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      description: authenticate user by token
 *      tags: [Users]
 *      parameters:
 *          - in: header
 *            name: x_auth
 *            schema:
 *              type: string
 *            required: true
 *            description: cookie for auth
 *      responses:
 *          200:
 *              description: authenticated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - success
 *                              - isAuth
 *                              - user
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              isAuth:
 *                                  type: boolean
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *      
 */
router.get('/auth', Auth, UserController.auth);


/**
 * @swagger
 * /api/users/logout:
 *  get:
 *      security: 
 *          - cookieAuth: []
 *      description: logout user
 *      tags: [Users]
 *      parameters:
 *          - in: header
 *            name: x_auth
 *            schema:
 *              type: string
 *            required: true
 *            description: token for logout
 *      responses:
 *          200:
 *              description: logout success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - success
 *                              - isAuth
 *                          properties:
 *                              success: 
 *                                  type: boolean
 *                              isAuth:
 *                                  type: boolean
 *      
 */
router.get('/logout', Auth, UserController.logout);


/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      description: get user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: user has been found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - success
 *                              - user
 *                          properties:
 *                              success: 
 *                                  type: boolean
 *                              user:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/User'
 */
router.get('/:id', UserController.userById);


module.exports = router;