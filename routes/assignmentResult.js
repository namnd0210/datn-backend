import express from 'express';

import {
  createResult,
  getResultByAssignmentAndUserId,
  getResultByAssignmentId,
  getResultById,
  getResultByUserId,
  updateResult,
} from '../controllers/assignmentResult';

const router = express.Router();

// router.get('/', getAllResults);
// router.get('/class/:id', getAllByClassId);
router.get('/:id', getResultById);
router.get('/assignment/:id', getResultByAssignmentId);
router.get('/user/:userId/assignment/:assignmentId', getResultByAssignmentAndUserId);
router.get('/user/:id', getResultByUserId);
router.put('/update', updateResult);
router.post('/', createResult);

export default router;
