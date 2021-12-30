import express from 'express';

import Class from '../models/Class';
import ClassStudent from '../models/ClassStudent';
import User from '../models/User';

const router = express.Router();

export const getClasses = async (req, res) => {
  const { page, id } = req.query;
  let query = {};
  if (id) {
    query = { ...query, students: id };
  }
  let count = await Class.countDocuments(query);
  Class.find(query)
    .populate({ path: 'teacher', model: 'User' })
    .populate({
      path: 'exam',
      model: 'Exam',
      populate: {
        path: 'questions',
        model: 'Question',
      },
    })
    .populate({ path: 'students', model: 'User' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .limit(10)
    .skip((page ? page - 1 : 0) * 10)
    .then((classData) => {
      res.status(200).json({ data: classData, total: count });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getClassesByIds = async (req, res) => {
  const classes = req.query.classes;

  await Class.find({ _id: { $in: classes } })
    .populate({ path: 'teacher', model: 'User', select: 'name' })
    .populate({
      path: 'exam',
      model: 'Exam',
      populate: {
        path: 'questions',
        model: 'Question',
      },
    })
    .populate({ path: 'students', model: 'User', select: 'name' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .then((classData) => {
      res.status(200).json({ data: classData });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};

export const getClassesByUserId = async (req, res) => {
  const id = req.params.id;
  const role = req.query.role;

  if (role === 2) {
    await Class.find(
      {},
      {
        students: {
          $elemMatch: {
            id,
          },
        },
      },
    )
      .populate({ path: 'teacher', model: 'User', select: 'name' })
      .populate({
        path: 'exam',
        model: 'Exam',
        populate: {
          path: 'questions',
          model: 'Question',
        },
      })
      .populate({ path: 'students', model: 'User', select: 'name' })
      .populate({ path: 'assignments', model: 'Assignment' })
      .then((classData) => {
        res.status(200).json({ data: classData });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
    return;
  }

  if (role === 1) {
    await Class.find({ teacher: id })
      .populate({ path: 'teacher', model: 'User', select: 'name' })
      .populate({
        path: 'exam',
        model: 'Exam',
        populate: {
          path: 'questions',
          model: 'Question',
        },
      })
      .populate({ path: 'students', model: 'User', select: 'name' })
      .populate({ path: 'assignments', model: 'Assignment' })
      .then((classData) => {
        res.status(200).json({ data: classData });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
    return;
  }

  await Class.find({})
    .populate({ path: 'teacher', model: 'User', select: 'name' })
    .populate({
      path: 'exam',
      model: 'Exam',
      populate: {
        path: 'questions',
        model: 'Question',
      },
    })
    .populate({ path: 'students', model: 'User', select: 'name' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .then((classData) => {
      res.status(200).json({ data: classData });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};

export const getClassById = async (req, res) => {
  const { page } = req.query;
  const { id } = req.params;
  let count = await Class.countDocuments();

  Class.findOne({ _id: id })
    .populate({ path: 'teacher', model: 'User', select: 'name' })
    .populate({ path: 'exam', model: 'Exam' })
    .populate({ path: 'students', model: 'User', select: 'name' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .limit(10)
    .skip((page ? page - 1 : 0) * 10)
    .then((classRes) => res.status(200).json({ data: classRes, total: count }))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const updateClass = async (req, res) => {
  const classId = req.body._id;

  await req.body.students.forEach(async (studentId) => {
    await User.findByIdAndUpdate(studentId, { $addToSet: { classes: classId } }, { upsert: true });
  });

  await Class.findByIdAndUpdate(
    classId,
    {
      name: req.body.name,
      teacher: req.body.teacher,
      exam: req.body.exam,
      students: req.body.students,
      assignments: req.body.assignments,
      updated_at: Date.now(),
      updated_by: req.body.updated_by,
    },
    { new: true, useFindAndModify: false },
  )
    .populate({ path: 'exam', model: 'Exam' })
    .populate({ path: 'teacher', model: 'User' })
    .populate({ path: 'students', model: 'User' })
    .populate({ path: 'assignments', model: 'Assignment' })
    .populate({ path: 'created_by', model: 'User' })
    .populate({ path: 'updated_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const createClass = (req, res) => {
  const classModel = new Class(req.body);
  classModel
    .save()
    .then((classRes) => {
      Class.findOne({ _id: classRes._id })
        .populate({ path: 'students', model: 'User', select: 'name' })
        .populate({ path: 'teacher', model: 'User', select: 'name' })
        .populate({ path: 'exam', model: 'Exam' })
        .then((foundedRes) => {
          res.status(200).json({ success: true, data: foundedRes });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export const deleteClass = (req, res) => {
  Class.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

export default router;
