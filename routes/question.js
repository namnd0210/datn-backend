import express from 'express';

import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  importCsvQuestions,
  updateQuestion,
} from '../controllers/question';

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', createQuestion);
router.put('/update', updateQuestion);
router.delete('/:id', deleteQuestion);
router.post('/csv', importCsvQuestions);

export default router;
