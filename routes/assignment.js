import express from 'express';

import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsByTeacherId,
  getAssignmentById,
  updateAssignment,
} from '../controllers/assignment';

const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:id', getAssignmentById);
router.get('/user/:id', getAllAssignmentsByTeacherId);
router.post('/', createAssignment);
router.put('/update', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
