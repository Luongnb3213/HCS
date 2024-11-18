// src/controllers/commentController.js
import { Prisma } from '@prisma/client';
import CommentModel from '../models/commentModel.js';


 export const getAllComments = async (req, res) => {
    try {
      const comments = await CommentModel.findAll();
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  }

  // Lấy bình luận theo ID
  export const getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
      const comment = await CommentModel.findById(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching comment', error: error.message });
    }
  }

  export const createComment = async (req, res) => {
    const { postId, userId, content, likes } = req.body;
  
    // Validate input
    if (!postId || !userId || !content) {
      return res.status(400).json({ message: 'Post ID, User ID, and Content are required' });
    }
  
    const newComment = {
      postId,
      userId,
      content,
      likes: parseInt(likes)  || 0,
    };
  
    try {
      const createdComment = await CommentModel.create(newComment);
      console.log(createdComment);
      return res.status(201).json(createdComment);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error: ', {
          code: error.code,
          message: error.message,
          meta: error.meta,
        });
        res.status(500).json({
          message: 'Error fetching doctors',
          prismaError: error.message,
          details: error.meta,
        });
      } else {
        console.error('General error: ', error);
        res
          .status(500)
          .json({ message: 'Error fetching comments', error: error.message });
      }
    }
  };
  

  // Cập nhật bình luận
  export const  updateComment = async (req, res) => {
    const { id } = req.params;
    const { content, likes } = req.body;

    if (!content && likes === undefined) {
      return res.status(400).json({ message: 'Content or Likes must be provided for update' });
    }

    const updatedData = {};
    if (content) updatedData.content = content;
    if (likes !== undefined) updatedData.likes = likes;

    try {
      const updatedComment = await CommentModel.update(id, updatedData);
      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
  }

  // Xóa bình luận
  export const  deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedComment = await CommentModel.delete(id);
      return res.status(200).json({ message: 'Comment deleted successfully', deletedComment });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
  }



