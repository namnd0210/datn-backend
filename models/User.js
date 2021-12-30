import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  avatar: { type: String },
  date: { type: Date, default: Date.now },
  role: { type: Number, default: 2 },
});

const User = mongoose.model('User', UserSchema);

export default User;
