import Comment from '../models/Comment';

export const getAllComments = async (req, res) => {
  let count = await Comment.countDocuments();
  const { page } = req.query;
  Comment.find({})
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createComment = (req, res) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then((comment) => {
      Comment.findOne({ _id: comment._id })
        .populate({ path: 'created_by', model: 'User' })
        .then((c) => {
          res.status(200).json({ comment: c });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateComment = (req, res) => {
  console.log(req.params._id);
  Question.findByIdAndUpdate(
    req.body._id,
    {
      content: req.body.content,
      images: req.body.images,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: true },
  )
    .populate({ path: 'updated_by', model: 'User' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteComment = (req, res) => {
  Comment.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
