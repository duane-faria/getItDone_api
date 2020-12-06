const multer = require('multer');
const { Router } = require('express');

const auth = require('./app/middlewares/Authentication');
const controllers = require('./app/controllers');
const routes = new Router();
const multerConfig = require('./app/config/multer');

const uploads = multer(multerConfig);

// users
routes.post('/users', controllers.UserController.store);

// ads
routes.post('/ads', uploads.array('files', 10), controllers.AdController.store);

routes.post('/post', controllers.AuthController.store);

routes.use(auth);

module.exports = routes;
