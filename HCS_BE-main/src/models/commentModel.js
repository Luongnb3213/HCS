// src/models/hospitalModel.js
import { PrismaClient } from '@prisma/client';
import prisma from './prismaClient.js';

const CommentModel = {
  findAll: async () => {
    try {
      return await prisma.comment.findMany();
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  },

  findById: async (id) => {
    try {
      return await prisma.comment.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  },

  create: async (commmentData) => {
    try {
      return await prisma.comment.create({
        data: commmentData,
      });
    } catch (error) {
       console.log(error)
    }
  },

  update: async (id, commmentData) => {
    try {
      return await prisma.comment.update({
        where: { id },
        data: commmentData,
      });
    } catch (error) {
      throw new Error('Error updating hospital');
    }
  },

  delete: async (id) => {
    try {
      return await prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error deleting hospital');
    }
  },
};

export default CommentModel;
