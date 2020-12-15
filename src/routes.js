const multer = require('multer');
const { Router } = require('express');

const auth = require('./app/middlewares/Authentication');
const controllers = require('./app/controllers');
const routes = new Router();
const multerConfig = require('./app/config/multer');

const uploads = multer(multerConfig);

// users register
routes.post('/users', uploads.single('avatar'),controllers.UserController.store);

// login
routes.post('/auth', controllers.AuthController.store);

routes.use(auth);

// ads
routes.post('/ads', uploads.array('files', 10), controllers.AdController.store);
routes.get('/ads', controllers.AdController.index);
routes.get('/ads/user/:id', controllers.AdController.getAdsByUser);

routes.get('/users', controllers.UserController.index);

module.exports = routes;
