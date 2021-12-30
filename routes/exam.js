import express from 'express';

import { createExam, createRandomExam, deleteExam, getAllExams, getExam, updateExam } from '../controllers/exam';

const router = express.Router();

router.get('/', getAllExams);
router.get('/:id', getExam);
router.post('/', createExam);
router.post('/random', createRandomExam);
router.put('/update', updateExam);
router.delete('/:id', deleteExam);

export default router;
