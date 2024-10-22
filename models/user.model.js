const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the membername is unique
  },
  password: {
    type: String,
    required: true,
  },
  YOB: {
    type: Number,
    min: 1900,
    max: 2100
  },
  name: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Middleware to hash the password before saving the member
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password has changed
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the Member model
const User = mongoose.model('User', userSchema);

module.exports = User;
