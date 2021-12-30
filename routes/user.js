import express from 'express';

// import passport from 'passport';
import { deleteUser, getAllUsers, login, register, updateUser } from '../controllers/user';
// import admin from './../utils/admin';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update', updateUser);
router.delete('/:id', deleteUser);

export default router;
