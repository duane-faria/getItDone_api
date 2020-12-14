const aws = require('aws-sdk');
const crypto = require('crypto');
const { extname, resolve } = require('path');
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = {
  storage: multerS3({
    s3: new aws.S3({ apiVersion: '2006-03-01' }),
    bucket: 'dfaria-getitdone',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);
        console.log(res.toString('hex') + extname(file.originalname), 'oi');
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
