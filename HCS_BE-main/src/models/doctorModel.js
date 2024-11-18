import prisma from './prismaClient.js';

const DoctorModel = {
  findAll: async () => {
    return await prisma.doctor.findMany();
  },

  findByFilter: async (
    filters,
    sortType = 'asc',
    date = null,
    pageSize,
    limit = 4
  ) => {
    let availableDaysFilter = {};

    // Thêm bộ lọc cho availableDays nếu có date
    if (date) {
      availableDaysFilter = {
        availableDays: {
          path: `$.${date}`, // Lọc theo ngày cụ thể
          not: null,
        },
      };
    }

    // Sử dụng include để lấy dữ liệu từ bảng 'user'
    const doctors = await prisma.doctor.findMany({
      where: {
        AND: [
          ...filters,
          availableDaysFilter, // Thêm bộ lọc theo availableDays
        ],
      },
      include: {
        user: true, // Bao gồm thông tin user liên kết với doctor
        hospital: true,
      },
      skip: parseInt(pageSize),
      take: limit,
    });

    // Kiểm tra nếu có dữ liệu doctor
    if (doctors && doctors.length > 0) {
      // Sắp xếp danh sách bác sĩ theo tên người dùng (user.fullName)
      doctors.sort((a, b) => {
        if (sortType === 'asc') {
          return a.user.fullName.localeCompare(b.user.fullName);
        } else {
          return b.user.fullName.localeCompare(a.user.fullName);
        }
      });

      return doctors;
    }

    return [];
  },

  create: async (data) => {
    return await prisma.doctor.create({
      data,
    });
  },

  findById: async (id) => {
    return await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: true,
        hospital: true,
      },
    });
  },

  update: async (id, data) => {
    return await prisma.doctor.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return await prisma.doctor.delete({
      where: { id },
    });
  },
};

export default DoctorModel;
