const Comment = require('../models/comment.model');

// Get all comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('author').populate('watch');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new comment
exports.createComment = async (req, res) => {
  const comment = new Comment({
    rating: req.body.rating,
    content: req.body.content,
    author: req.body.author,
    watch: req.body.watch,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
