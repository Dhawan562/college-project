const express = require('express');
const {
  getAllPrescriptions,
  getPrescriptionsForPharmacy,
  getPrescriptionsForDoctor,
  getPrescriptionsForPatient,
  createPrescriptions,
  updatePrescriptions,
  cancelPrescriptionById,
} = require('../controller/PrescriptionController');
const upload = require('../utils/fileUpload');
const Router = express.Router();

Router.get('/', getAllPrescriptions);
Router.post('/', upload.single('image'), createPrescriptions);
Router.put('/', updatePrescriptions);
Router.post('/cancel/:id', cancelPrescriptionById);
Router.get('/pharmacy/:pharmacyId', getPrescriptionsForPharmacy);
Router.get('/doctor/:doctorId', getPrescriptionsForDoctor);
Router.get('/patient/:patientId', getPrescriptionsForPatient);

module.exports = Router;
