import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/investigation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));


// Signup
app.post('/signup', async (req, res) => {
  const { name, password, role } = req.body;
  const existing = await User.findOne({ name });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name, password, role });
  await user.save();
  res.json({ message: 'User created' });
});

// Login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ role: user.role });
});

// Create Case
app.post('/create-case', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (err) {
    console.error('Error creating case:', err);
    res.status(500).json({ message: 'Error creating case', error: err.message });
  }
});

// Admin View - All Pending Cases
app.get('/cases/pending', async (req, res) => {
  try {
    const cases = await Case.find({ status: 'pending' });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cases' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
