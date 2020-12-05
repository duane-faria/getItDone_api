const express = require('express');
require('express-async-errors');
const Youch = require('youch');
const cors = require('cors');
require('dotenv/config');

const routes = require('./routes');
require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    async function middleware(err, req, res, next) {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    }
    this.server.use(middleware);
  }
}

module.exports = new App().server;
