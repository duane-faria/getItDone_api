const models = require('../models');
const Yup = require('yup');

class AuthController {
  async store(req, res) {
    console.log(req.body, 'body');

    const Token = await models.User.findOne(req.body);

    return res.json(Ad);
  }
}

module.exports = new AuthController();
