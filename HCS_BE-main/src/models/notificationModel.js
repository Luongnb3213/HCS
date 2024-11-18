import prisma from './prismaClient.js';

const NotificationModel = {
  findAll: async () => {
    return await prisma.notification.findMany();
  },

  create: async (data) => {
    return await prisma.notification.create({
      data,
    });
  },

  findById: async (id, pageSize, limit = 4) => {
    console.log(pageSize)
    return await prisma.notification.findMany({
      where: { userId: id },
      include: {
        user: true,
      },
      skip: parseInt(pageSize),
      take: limit,
    });
  },

  update: async (id, data) => {
    return await prisma.notification.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return await prisma.notification.delete({
      where: { id },
    });
  },
};

export default NotificationModel;
