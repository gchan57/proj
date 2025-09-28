const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // In a real app, you MUST hash and salt passwords. This is simplified for the example.
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'freelancer'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);