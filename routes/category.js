import express from 'express';

import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/update', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
