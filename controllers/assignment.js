import Assignment from '../models/Assignment';
import AssignmentResult from './../models/AssignmentResult';

export const getAllAssignments = async (req, res) => {
  let count = await Assignment.countDocuments();
  const { page } = req.query;
  Assignment.find({})
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getAllAssignmentsByTeacherId = async (req, res) => {
  let count = await Assignment.countDocuments();
  const id = req.params.id;
  // check role before return

  Assignment.find({ created_by: id })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getAssignmentById = async (req, res) => {
  const id = req.params.id;
  let assignmentResults = [];

  await AssignmentResult.find({ assignment: id })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .then((arData) => (assignmentResults = arData))
    .catch((err) => res.status(400).json({ err }));

  await Assignment.findOne({ _id: id })
    .lean()
    .then((data) => {
      const newData = { ...data, assignmentResults };

      res.status(200).json({
        data: newData,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createAssignment = (req, res) => {
  const assignment = new Assignment(req.body);
  assignment
    .save()
    .then((assignment) => {
      Assignment.findOne({ _id: assignment._id })
        .populate({ path: 'comments', model: 'Comment' })
        .populate({ path: 'created_by', model: 'User', select: 'name' })
        .then((c) => {
          res.status(200).json({ data: c });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateAssignment = (req, res) => {
  Assignment.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      files: req.body.files ?? [],
      description: req.body.description,
      due_date: req.body.due_date,
      updated_at: Date.now(),
      created_by: req.body.created_by,
    },
    { new: true, useFindAndModify: true },
  )
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteAssignment = (req, res) => {
  Assignment.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
