import express from 'express';

import Result from '../models/Result';

const router = express.Router();

export const getAllResults = async (req, res) => {
  let count = await Result.countDocuments();
  const { page } = req.query;

  Result.find({})
    .populate({ path: 'user', model: 'User' })
    .populate({ path: 'exam', model: 'Exam' })
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((results) => res.status(200).json({ data: results, total: count }))
    .catch((err) => res.status(400).json({ err }));
};

export const getResultByUser = async (req, res) => {
  let count = await Result.find({ _id: req.params.id }).countDocuments();
  const { page } = req.query;

  Result.find({ user: req.params.id })
    .populate({ path: 'user', model: 'User' })
    .populate({ path: 'exam', model: 'Exam' })
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((results) => res.status(200).json({ results, total: count }))
    .catch((err) => res.status(400).json({ err }));
};

export const createResult = (req, res) => {
  const result = new Result(req.body);
  result
    .save()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export default router;
