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

router.put('/cases/:caseId/complete', async (req, res) => {
  const { caseId } = req.params;
  const { isCompleted, report } = req.body;

  try {
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { isCompleted, report },
      { new: true }
    );
    res.json(updatedCase);
  } catch (err) {
    console.error('Error completing case:', err);
    res.status(500).send('Server error');
  }
});

export default router;
