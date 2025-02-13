const mongoose = require('mongoose');

const schema = mongoose.Schema;

const watchSchema = new schema({
  watchName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Automatic: {
    type: Boolean,
    default: false,
  },
  watchDescription: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
    required: true,
  },
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;
