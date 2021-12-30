import express from 'express';

import {
  createClass,
  deleteClass,
  getClassById,
  getClasses,
  getClassesByIds,
  getClassesByUserId,
  updateClass,
} from '../controllers/class';

const router = express.Router();

router.get('/', getClasses);
router.get('/ids', getClassesByIds);
router.get('/:id', getClassById);
router.get('/user/:id', getClassesByUserId);
router.post('/', createClass);
router.put('/update', updateClass);
router.delete('/:id', deleteClass);

export default router;
