const { Router } = require('express');
const models = require('./app/controllers');
const routes = new Router();
const auth = require('./app/middlewares/Authentication');

routes.get('/', (req, res) => res.send('ola mundo'));

routes.use(auth);

module.exports = routes;
