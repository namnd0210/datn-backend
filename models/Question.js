import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  question: { required: true, type: String, maxLength: 200 },
  answers: [{ type: String, maxLength: 100 }],
  level: { required: true, type: Number, maxLength: 1 },
  correctAnswer: { required: true, type: Number, maxLength: 1 },
  updated_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
