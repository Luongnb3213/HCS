import { Prisma } from '@prisma/client';
import DoctorModel from '../models/doctorModel.js';

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

export const getAllDoctorsFilters = async (req, res) => {
  let filters = [
    {
      rating: { gt: 1 },
    },
  ];
  const { specialty, numberPfMedicalAppointments, reviews, date, price , pageSize } =
    req.body;
  if (specialty?.trim().length) {
    filters.push({
      specialty: specialty.trim(),
    });
  }

  if ( reviews && reviews?.trim().length) {
    filters[0].reviews = { gt: parseFloat(reviews.trim()) };
  }

  if (price?.trim().length) {
    const [minPrice, maxPrice] = price
      .split(',')
      .map((p) => parseFloat(p.trim()));
    filters.push({
      rent: {
        gte: minPrice,
        lte: maxPrice,
      },
    });
  }
  try {
    const doctors = await DoctorModel.findByFilter(
      filters,
      numberPfMedicalAppointments,
      date,
      pageSize
    );
    if (doctors) {
      res.json(doctors);
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

export const getDoctorByID = async (req, res) => {
  const { id } = req.query;
  try {
    const doctor = await DoctorModel.findById(id);
    if (doctor) {
      res.json(doctor);
      return;
    }
    res.status(500).json({ message: 'Not Found' });
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
