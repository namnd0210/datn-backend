import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const classStudentSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  student: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ClassStudent = mongoose.model('ClassStudent', classStudentSchema);

export default ClassStudent;
