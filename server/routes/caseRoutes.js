import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import Case from '../models/Case.js';

// Writer creates a new case
router.post('/', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json({ message: 'Case submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit case' });
  }
});

// Admin gets all pending cases
router.get('/pending', async (req, res) => {
  try {
    const cases = await Case.find({ status: 'pending' });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// Admin assigns a case
router.put('/:id/assign', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { assignedTo: userId, status: 'assigned' },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.status(200).json(updatedCase);
  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all cases assigned to a specific user
router.get('/assigned/:userId', async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.params.userId);
    const cases = await Case.find({ assignedTo: userObjectId }).populate('assignedTo');
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get details of a specific case
router.get('/:id', async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id).populate('assignedTo');
    if (!foundCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json(foundCase);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
