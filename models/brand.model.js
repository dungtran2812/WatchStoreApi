const mongoose = require('mongoose');
const schema = mongoose.Schema;

const brandSchema = new schema({
  brandName: { type: String, required: true },
}, { timestamps: true });

const Brand = mongoose.model('Brands', brandSchema);
module.exports = Brand;
