const Brand = require('../models/brand.model');

// Get all brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new brand
exports.createBrand = async (req, res) => {
  const brand = new Brand({ brandName: req.body.brandName });

  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
