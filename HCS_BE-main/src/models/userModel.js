import prisma from './prismaClient.js';

const UserModel = {
  // Lấy tất cả người dùng
  findAll: async () => {
    return await prisma.user.findMany();
  },

  // Tìm người dùng theo ID
  findByUsernameAndPassword: async (name, pass) => {
    return await prisma.user.findFirst({
      where: {
        AND: [
          {
            username: name,
          },
          {
            password: pass,
          },
        ],
      },
    });
  },

  // Tạo người dùng mới
  create: async (data) => {
    return await prisma.user.create({
      data,
    });
  },

  // Tìm người dùng theo ID
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

   // Tìm người dùng theo trường
   findByFields: async (fields) => {
    return await prisma.user.findUnique({
      where: { ...fields },
    });
  },

  // Cập nhật thông tin người dùng
  update: async (fieldsToFind, data) => {
    return await prisma.user.update({
      where: { ...fieldsToFind },
      data,
    });
  },

  // Xóa người dùng theo ID
  delete: async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

export default UserModel;
