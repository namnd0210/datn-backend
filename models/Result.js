import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_at: { type: Date, default: Date.now() },
  result: { type: String },
  created_at: { type: Date, default: Date.now() },
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
