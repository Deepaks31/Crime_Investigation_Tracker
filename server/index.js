import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import caseRoutes from './routes/caseRoutes.js';
import User from './models/User.js';
import Case from './models/Case.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/investigation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// Mount routes
app.use('/users', userRoutes);
app.use('/cases', caseRoutes);

// Signup route
app.post('/signup', async (req, res) => {
  const { name, password, role } = req.body;

  try {
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const userId = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit user ID
    const user = new User({ name, password, role, userId });
    await user.save();

    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { name, password, userId } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (String(user.userId) !== String(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    res.json({ role: user.role, name: user.name, userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});




// Create case
app.post('/create-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating case', error: err.message });
  }
});

// View pending cases
app.get('/cases/pending', async (req, res) => {
  try {
    const cases = await Case.find({ status: 'pending' });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cases', error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
