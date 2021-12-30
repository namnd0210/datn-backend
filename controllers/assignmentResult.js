import AssignmentResult from '../models/AssignmentResult';

export const getResultByUserId = async (req, res) => {
  let count = await AssignmentResult.countDocuments();
  const id = req.params.id;
  AssignmentResult.find({ created_by: id })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .populate({ path: 'assignment', model: 'Assignment' })
    .populate({ path: 'class', model: 'Class' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getResultByAssignmentId = async (req, res) => {
  const id = req.params.id;
  AssignmentResult.findOne({ assignment: id })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .populate({ path: 'assignment', model: 'Assignment' })
    .populate({ path: 'class', model: 'Class' })
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getResultByAssignmentAndUserId = async (req, res) => {
  const { assignmentId, userId } = req.params;
  AssignmentResult.findOne({ created_by: userId, assignment: assignmentId })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .populate({ path: 'assignment', model: 'Assignment' })
    .populate({ path: 'class', model: 'Class' })
    .then((data) => {
      res.status(200).json({
        data: data ?? {},
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const getResultById = async (req, res) => {
  const id = req.params.id;
  AssignmentResult.findOne({ _id: id })
    .populate({ path: 'created_by', model: 'User', select: 'name' })
    .populate({ path: 'assignment', model: 'Assignment' })
    .populate({ path: 'class', model: 'Class' })
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const updateResult = async (req, res) => {
  const id = req.body._id;
  AssignmentResult.findByIdAndUpdate(
    id,
    { files: req.body.files, point: req.body.point, comments: req.body.comments },
    { new: true, useFindAndModify: true },
  )
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createResult = (req, res) => {
  const result = new AssignmentResult(req.body);
  result
    .save()
    .then((assignmentRes) => {
      AssignmentResult.findOne({ _id: assignmentRes._id })
        .populate({ path: 'assignment', model: 'Assignment' })
        .populate({ path: 'class', model: 'Class' })
        .populate({ path: 'created_by', model: 'User' })
        .then((c) => {
          res.status(200).json({ data: c });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
