import prisma from './prismaClient.js';

const MedicationModel = {
  // Lấy tất cả bài viết
  findAll: async () => {
    return await prisma.medication.findMany({
      include: {
          user: true
      }
    });
  },

  // Tạo bài viết mới
  create: async (data) => {
    return await prisma.medication.create({
      data,
    });
  },

  // Tìm bài viết theo ID
  findById: async (id) => {
    return await prisma.medication.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  },
  // Cập nhật bài viết
  update: async (id, data) => {
    return await prisma.medication.update({
      where: { id },
      data,
    });
  },

  // Xóa bài viết theo ID
  delete: async (id) => {
    return await prisma.medication.delete({
      where: { id },
    });
  },
};

export default MedicationModel;
