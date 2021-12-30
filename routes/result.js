import express from 'express';

import { createResult, getAllResults, getResultByUser } from '../controllers/result';

const router = express.Router();

router.get('/', getAllResults);
router.get('/user/:id', getResultByUser);
router.post('/', createResult);

export default router;
