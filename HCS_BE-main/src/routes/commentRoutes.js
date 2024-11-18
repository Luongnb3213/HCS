import express from 'express';
import {
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';


const router = express.Router();


router.get('/:id', getCommentById);


router.post('/', createComment);


router.put('/:id', updateComment);


router.delete('/:id', deleteComment);

export default router;
