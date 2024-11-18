import express from 'express';
import { getAllDoctors, getAllDoctorsFilters ,getDoctorByID} from '../controllers/doctorController.js'

const router = express.Router();


router.get('/', getAllDoctors);
router.get('/getDoctorByID', getDoctorByID);
router.post('/filter',getAllDoctorsFilters)

export default router;
