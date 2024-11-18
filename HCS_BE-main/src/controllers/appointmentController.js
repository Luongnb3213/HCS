import AppointmentModel from '../models/appointmentModel.js';
import { Prisma } from '@prisma/client';

export const getAllAppointments = async (req, res) => {
  const { id, status, pageSize } = req.query;

  try {
    const appointments = await AppointmentModel.findById(id, status,pageSize);
    if (appointments) {
      res.json(appointments);
      return;
    }

    res.json([]);
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
        .json({ message: 'Error fetching doctors', error: error.message });
    }
  }
};


export const createAppointment = async (req, res) => {
  const { userId, doctorId, hospitalId, appointmentDate, status, reason } = req.body;
  console.log(req.body)

  if (!userId || !doctorId || !hospitalId || !appointmentDate ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const appointmentData = {
    userId,
    doctorId,
    hospitalId,
    appointmentDate: appointmentDate,
    status: status || 'PENDING',
    reason,
  };

  try {

    const newAppointment = await AppointmentModel.create(appointmentData);
    
    return res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment: ', error);
    return res.status(500).json({ message: 'Error creating appointment', error });
  }
};