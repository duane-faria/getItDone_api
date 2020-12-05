const { Router } = require('express');
const controllers = require('./app/controllers');
const routes = new Router();
const auth = require('./app/middlewares/Authentication');

routes.get('/', (req, res) => res.send('ola mundo'));

routes.post('/users', controllers.UserController.store);

routes.use(auth);

module.exports = routes;
