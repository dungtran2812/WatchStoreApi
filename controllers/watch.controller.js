const Watch = require('../models/watch.model');

// Get all watches
exports.getWatches = async (req, res) => {
  try {
    const watches = await Watch.find().populate('brand').populate('comments');
    res.json(watches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single watch by ID
exports.getWatchById = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id).populate('brand').populate('comments');
    if (!watch) return res.status(404).json({ message: 'Watch not found' });
    res.json(watch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new watch
exports.createWatch = async (req, res) => {
  const watch = new Watch({
    watchName: req.body.watchName,
    image: req.body.image,
    price: req.body.price,
    Automatic: req.body.Automatic,
    watchDescription: req.body.watchDescription,
    brand: req.body.brand,
  });

  try {
    const newWatch = await watch.save();
    res.status(201).json(newWatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a watch by ID
exports.updateWatch = async (req, res) => {
  try {
    const updatedWatch = await Watch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWatch) return res.status(404).json({ message: 'Watch not found' });
    res.json(updatedWatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a watch by ID
exports.deleteWatch = async (req, res) => {
  try {
    const watch = await Watch.findByIdAndDelete(req.params.id);
    if (!watch) return res.status(404).json({ message: 'Watch not found' });
    res.json({ message: 'Watch deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
