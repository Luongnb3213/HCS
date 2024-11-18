// src/routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
