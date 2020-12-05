const models = require('../models');
const Yup = require('yup');

class AdController {
  async store(req, res) {
    return res.json({ ok: true, user });
  }
}

module.exports = new AdController();
