import Category from '../models/Category';

export const getAllCategories = async (req, res) => {
  let total = await Category.countDocuments();
  const { page } = req.query;
  Category.find({})
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((category) =>
      res.status(200).json({
        data: category,
        total,
      }),
    )
    .catch((err) => res.status(400).json({ err }));
};

export const createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.status(200).json({ success: true, category });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateCategory = (req, res) => {
  console.log(req);

  Category.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: false },
  )
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
