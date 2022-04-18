const express = require('express');
const {
  getAllPrescriptions,
  getPrescriptionsByPharmacy,
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
  createPrescriptions,
  updatePrescriptions,
} = require('../controller/PrescriptionController');

const Router = express.Router();

Router.get('/', getAllPrescriptions);
Router.post('/', createPrescriptions);
Router.put('/', updatePrescriptions);
Router.get('/pharmacy/:pharmacyId', getPrescriptionsByPharmacy);
Router.get('/doctor/:doctorId', getPrescriptionsByDoctor);
Router.get('/patient/:patientId', getPrescriptionsByPatient);

module.exports = Router;
