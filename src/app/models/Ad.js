const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate'),
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const AdSchema = new mongoose.Schema(
  {
    adNumber: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: [{ key: String, url: String, thumbnailUrl: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

AdSchema.plugin(mongoosePaginate);

AdSchema.pre('remove', async function (next) {
  this.images.map((img) => {
    s3.deleteObject(
      {
        Bucket: 'dfaria-getitdone',
        Key: img.key,
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
        // error
        else console.log('deletado'); // deleted
      }
    );
  });
});

// AdSchema.plugin(autoIncrement.plugin, {
//   model: 'Ad',
//   field: 'adNumber',
//   startAt: 1,
//   incrementBy: 1,
// });

module.exports = mongoose.model('Ad', AdSchema);
