// src/controllers/medicationController.js
import MedicationModel from '../models/medicationModel.js'

const MedicationController = {
  // Lấy tất cả lịch nhắc
  getAllMedications: async (req, res) => {
    try {
      const medications = await MedicationModel.findAll();
      return res.status(200).json(medications);
    } catch (error) {
      console.error('Error fetching medications:', error);
      return res.status(500).json({ message: 'Error fetching medications' });
    }
  },

  // Lấy lịch nhắc thuốc theo ID
  getMedicationById: async (req, res) => {
    const { id } = req.params;
    try {
      const medication = await MedicationModel.findById(id);
      if (!medication) {
        return res.status(404).json({ message: 'Medication not found' });
      }
      return res.status(200).json(medication);
    } catch (error) {
      console.error('Error fetching medication:', error);
      return res.status(500).json({ message: 'Error fetching medication' });
    }
  },

  // Tạo lịch nhắc thuốc mới
  createMedication: async (req, res) => {
    const { medicineName, dosage, frequency, reminderTime, status } = req.body;

    if (!medicineName || !dosage || !frequency || !reminderTime || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMedication = {
      medicineName,
      dosage,
      frequency,
      reminderTime,
      status,
    };

    try {
      const createdMedication = await MedicationModel.create(newMedication);
      return res.status(201).json(createdMedication);
    } catch (error) {
      console.error('Error creating medication:', error);
      return res.status(500).json({ message: 'Error creating medication' });
    }
  },

  // Cập nhật lịch nhắc thuốc
  updateMedication: async (req, res) => {
    const { id } = req.params;
    const { medicineName, dosage, frequency, reminderTime, status } = req.body;

    if (!medicineName && !dosage && !frequency && !reminderTime && !status) {
      return res.status(400).json({ message: 'At least one field must be updated' });
    }

    const updatedData = {};
    if (medicineName) updatedData.medicineName = medicineName;
    if (dosage) updatedData.dosage = dosage;
    if (frequency) updatedData.frequency = frequency;
    if (reminderTime) updatedData.reminderTime = reminderTime;
    if (status) updatedData.status = status;

    try {
      const updatedMedication = await MedicationModel.update(id, updatedData);
      return res.status(200).json(updatedMedication);
    } catch (error) {
      console.error('Error updating medication:', error);
      return res.status(500).json({ message: 'Error updating medication' });
    }
  },

  // Xóa lịch nhắc thuốc
  deleteMedication: async (req, res) => {
    const { id } = req.params;
    try {
      await MedicationModel.delete(id);
      return res.status(200).json({ message: 'Medication deleted successfully' });
    } catch (error) {
      console.error('Error deleting medication:', error);
      return res.status(500).json({ message: 'Error deleting medication' });
    }
  },
};

export default MedicationController;
