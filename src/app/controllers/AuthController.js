const jwt = require('jsonwebtoken');
const Yup = require('yup');

const authConfig = require('../config/auth');
const models = require('../models');

class AuthController {
  async store(req, res) {
    console.log(req.body, 'body');

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { email, password } = req.body;

    const user = await models.User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'invalid password' });
    }

    return res.json({
      token: jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

module.exports = new AuthController();
