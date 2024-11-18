import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();

  const allHospitals = await prisma.hospital.findMany();
  const appointments = await prisma.appointment.createMany({
    data: [
      {
        userId: allUsers.find((user) => user.username == 'user1')?.id,
        doctorId: "4389ed35-ea29-4da6-bae1-deedb59c0270",
        hospitalId: allHospitals[0]?.id,
        appointmentDate: new Date('2024-11-01T10:00:00Z'),
        status: 'PENDING',
        reason: 'Khám sức khỏe định kỳ',
      },
      {
        userId: allUsers.find((user) => user.username == 'user2')?.id,
        doctorId:  "4389ed35-ea29-4da6-bae1-deedb59c0270",
        hospitalId: allHospitals[1]?.id,
        appointmentDate: new Date('2024-11-02T11:00:00Z'),
        status: 'CONFIRMED',
        reason: 'Khám bệnh ngoài da',
      },
      {
        userId: allUsers.find((user) => user.username == 'user1')?.id,
        doctorId:  "4389ed35-ea29-4da6-bae1-deedb59c0270",
        hospitalId: allHospitals[0]?.id,
        appointmentDate: new Date('2024-11-03T09:00:00Z'),
        status: 'CANCELLED',
        reason: 'Không thể đến',
      },
      {
        userId: allUsers.find((user) => user.username == 'user2')?.id,
        doctorId:  "4389ed35-ea29-4da6-bae1-deedb59c0270",
        hospitalId: allHospitals[1]?.id,
        appointmentDate: new Date('2024-11-04T15:00:00Z'),
        status: 'COMPLETED',
        reason: 'Khám tổng quát',
      },
    ],
  });


  console.log('Dữ liệu mẫu đã được thêm vào cơ sở dữ liệu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
