import prisma from './prismaClient.js';

const PostModel = {
  // Lấy tất cả bài viết
  findAll: async () => {
    return await prisma.post.findMany({
      include: {
          user: true,
          comments: true
      }
    });
  },

  // Tạo bài viết mới
  create: async (data) => {
    return await prisma.post.create({
      data,
    });
  },

  // Tìm bài viết theo ID
  findById: async (id) => {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: true, // Bao gồm thông tin người tạo bài đăng
        comments: {
          include: {
            user: true, // Bao gồm thông tin người dùng cho mỗi bình luận
          },
        },
      },
    });
  },
  // Cập nhật bài viết
  update: async (id, data) => {
    return await prisma.post.update({
      where: { id },
      data,
    });
  },

  // Xóa bài viết theo ID
  delete: async (id) => {
    return await prisma.post.delete({
      where: { id },
    });
  },
};

export default PostModel;
