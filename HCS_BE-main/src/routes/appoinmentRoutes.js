import express from 'express';
import { getAllAppointments , createAppointment} from '../controllers/appointmentController.js'

const router = express.Router();


router.get('/', getAllAppointments);
router.post('/', createAppointment);


export default router;
