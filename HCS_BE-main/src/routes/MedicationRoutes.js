import express from 'express';
import MedicationController from '../controllers/medicationController.js'

const router = express.Router();


router.get('/', MedicationController.getAllMedications);
router.get('/:id', MedicationController.getMedicationById);
router.post('/',MedicationController.createMedication);
router.put('/:id', MedicationController.updateMedication);
router.delete('/:id', MedicationController.deleteMedication);

export default router;
