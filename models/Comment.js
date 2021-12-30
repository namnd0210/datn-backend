import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  images: [{ type: String }],
  updated_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
