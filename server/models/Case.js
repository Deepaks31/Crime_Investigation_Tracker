import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  suspectName: String,
  victimName: String,
  evidenceSummary: String,
  status: { type: String, default: 'pending' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
}, { timestamps: true });

const Case = mongoose.model('Case', caseSchema);
export default Case;
