import express from 'express';

import { createComment, deleteComment, getAllComments, updateComment } from '../controllers/comment';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);
router.put('/update', updateComment);
router.delete('/:id', deleteComment);

export default router;
