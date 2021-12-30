import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignmentResultSchema = new Schema({
  files: [{ type: String, require: true }],
  point: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', require: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class', require: true },
  status: { type: 'SUBMITTED' | 'NOT_SUBMITTED' | 'SUBMITTED_LATE' | 'MISSING' },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User', require: true },
});

const AssignmentResult = mongoose.model('AssignmentResult', assignmentResultSchema);

export default AssignmentResult;
