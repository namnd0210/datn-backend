import csv from 'csvtojson';

import Question from '../models/Question';

export const getAllQuestions = async (req, res) => {
  let count = await Question.countDocuments();
  const { page } = req.query;

  if (page) {
    Question.find({})
      .populate({ path: 'category', model: 'Category' })
      .populate({ path: 'created_by', model: 'User' })
      .skip((page ? page - 1 : 0) * 10)
      .limit(10)
      .then((data) => {
        res.status(200).json({
          data,
          total: count,
        });
      })
      .catch((err) => res.status(400).json({ err }));

    return;
  }

  Question.find({})
    .populate({ path: 'category', model: 'Category' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({
        data,
        total: count,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const createQuestion = (req, res) => {
  const question = new Question(req.body);
  question
    .save()
    .then((question) => {
      Question.findOne({ _id: question._id })
        .populate({ path: 'category', model: 'Category' })
        .populate({ path: 'created_by', model: 'User' })
        .then((ques) => {
          res.status(200).json({ question: ques });
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateQuestion = (req, res) => {
  Question.findByIdAndUpdate(
    req.body._id,
    {
      answers: req.body.answers,
      question: req.body.question,
      correctAnswer: req.body.correctAnswer,
      category: req.body.category,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: true },
  )
    .populate({ path: 'category', model: 'Category' })
    .populate({ path: 'updated_by', model: 'User' })
    .populate({ path: 'created_by', model: 'User' })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const deleteQuestion = (req, res) => {
  Question.deleteOne({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const importCsvQuestions = async (req, res) => {
  try {
    let questionData = [];

    await csv({ output: 'line' })
      .fromString(req.body)
      .subscribe((csvLine) => {
        const row = csvLine.split(',');
        const newQuestion = {
          question: row[0],
          answers: [row[1], row[2], row[3], row[4]],
          correctAnswer: row[5],
          level: row[6],
          category: row[7],
        };

        questionData.push(newQuestion);
      });

    Question.insertMany(questionData, (error, docs) => {
      if (error) {
        res.status(400).json(error);
        return;
      }
      res.status(200).json(docs);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
