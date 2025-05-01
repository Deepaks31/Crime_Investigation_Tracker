import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // Optional for auto-generated users
  },
  role: {
    type: String,
    enum: ['admin', 'writer', 'user'],
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    length: 4,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;