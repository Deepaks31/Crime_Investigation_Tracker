const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    location: String,
    suspectName: String,
    victimName: String,
    evidenceSummary: String,
    status: { type: String, default: 'pending' },
  });
  
  const Case = mongoose.model('Case', caseSchema);
  
  