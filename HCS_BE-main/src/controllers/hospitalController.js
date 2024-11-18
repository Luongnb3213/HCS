// src/controllers/hospitalController.js
import HospitalModel from '../models/hospitalModel.js';

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalModel.findAll();
    if(hospitals){
      res.json(hospitals);
        return;
    }
    res.status(500).json({ message: 'Error fetching hospitals', error });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error });
  }
};

export const getHospitalsByName = async (req, res) => {
   const { name , pageSize } = req.body;
  try {
    const hospitals = await HospitalModel.findByName(name, pageSize);
    if(hospitals){
      res.json(hospitals);
       return;
    }
    res.status(500).json({ message: 'Error fetching controller hospitals', error });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching try catch hospitals', error });
  }
}

export const getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await HospitalModel.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital', error });
  }
};

export const createHospital = async (req, res) => {
  try {
    const newHospital = await HospitalModel.create(req.body);
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error creating hospital', error });
  }
};

export const updateHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHospital = await HospitalModel.update(id, req.body);
    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hospital', error });
  }
};

export const deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    await HospitalModel.delete(id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hospital', error });
  }
};
