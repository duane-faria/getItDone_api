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

AdSchema.plugin(autoIncrement.plugin, {
  model: 'Ad',
  field: 'adNumber',
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model('Ad', AdSchema);
