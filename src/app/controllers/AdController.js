const models = require('../models');
const Yup = require('yup');

class AdController {
  async index(req, res) {
    const Ads = await models.Ad.find({},null,{ sort:{ createdAt: -1 } }).populate({path:'user', populate:{
      path:'totalAds'
    }});

    return res.json(Ads);
  }

  async store(req, res) {
    const { files } = req;
    console.log(req.files, 'files');
    console.log(req.body, 'body');

    req.body.price = Number(req.body.price);

    const images = files.map((file) => ({
      key: file.key,
      url: file.location,
      thumbnailUrl: file.location,
    }));

    const Ad = await models.Ad.create({ ...req.body, images });

    return res.json(Ad);
  }

  async getAdsByUser(req, res) {
    const { id : user } = req.params;

    const adsByUser = await models.Ad.find({ user }).populate('user');

    return res.json(adsByUser);
  }
}

module.exports = new AdController();
