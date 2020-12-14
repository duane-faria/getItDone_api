const models = require('../models');
const Yup = require('yup');

class UserController {
  async store(req, res) {
    const { location : avatar } = req.file;
    req.body.avatar = avatar;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.json({
        error:
          'validation failed, please check the data types and informations sent',
      });
    }

    const userAlreadyRegistered = await models.User.findOne({
      email: req.body.email,
    });

    if (userAlreadyRegistered) {
      return res.status(401).json({ error: 'e-mail already registered' });
    }

    const user = await models.User.create(req.body);

    return res.json({ ok: true, user });
  }
}

module.exports = new UserController();
