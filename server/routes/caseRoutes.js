import express from 'express';
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

// Example in routes/caseRoutes.js

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

router.get('/assigned/:userId', async (req, res) => {
  try {
    const cases = await Case.find({ assignedTo: req.params.userId });
    res.json(cases);
  } catch (err) {
    console.error('Error fetching assigned cases:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
