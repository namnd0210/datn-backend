import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExamSchema = mongoose.Schema({
  code: { type: Number, maxLength: 999, require: true },
  title: { type: String, required: true },
  description: { type: String, required: true, maxLength: 500 },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
  time: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Exam = mongoose.model('Exam', ExamSchema);

export default Exam;
