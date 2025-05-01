import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Generate a unique 4-digit userId
const generateUserId = async () => {
  let id, exists;
  do {
    id = Math.floor(1000 + Math.random() * 9000).toString();
    exists = await User.exists({ userId: id });
  } while (exists);
  return id;
};

// Create new user
router.post('/', async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !role ) {
        if (!name || !password || !role ) {
            return res.status(400).json({ error: 'Name and role are required' });
          }
          
    }

    const userId = await generateUserId();
    const newUser = new User({ name, password, role, userId });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
// GET /users?role=user
router.get('/', async (req, res) => {
    try {
      const query = {};
      if (req.query.role) {
        query.role = req.query.role;
      }
  
      const users = await User.find(query);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  

export default router;
