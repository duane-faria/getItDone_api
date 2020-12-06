const models = require('../models');
const Yup = require('yup');

class AdController {
  async store(req, res) {
    const { files } = req;
    console.log(req.files, 'files');
    console.log(req.body, 'body');

    const images = files.map((file) => ({
      key: file.key,
      url: file.location,
      thumbnailUrl: file.location,
    }));

    const Ad = await models.Ad.create({ ...req.body, images });

    return res.json(Ad);
  }
}

module.exports = new AdController();
