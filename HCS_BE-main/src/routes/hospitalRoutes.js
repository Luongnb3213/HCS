import express from 'express';

import {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalsByName
} from '../controllers/hospitalController.js';

const router = express.Router();

// Get all hospitals
router.get('/', getAllHospitals);

// Get a single hospital by ID
router.get('/:id', getHospitalById);

// Create a new hospital
router.post('/', createHospital);
router.post('/filter', getHospitalsByName);


// Update an existing hospital
router.put('/:id', updateHospital);

// Delete a hospital by ID
router.delete('/:id', deleteHospital);

export default router;
