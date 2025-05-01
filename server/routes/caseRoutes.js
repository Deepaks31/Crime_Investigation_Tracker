const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

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

module.exports = router;
