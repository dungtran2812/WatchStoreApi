const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Members", required: true },
  watch: { type: mongoose.Schema.Types.ObjectId, ref: "Watch", required: true }
}, { timestamps: true });

const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;
