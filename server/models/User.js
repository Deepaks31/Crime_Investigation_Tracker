import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'writer', 'user'], // Only these roles are valid
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
