const Prescription = require('../models/prescription');

async function getAllPrescriptions(req, res) {
  try {
    const prescriptions = await Prescription.find();
    if (!prescriptions.length) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsByPharmacy(req, res) {
  try {
    const prescriptions = await Prescription.find({
      pharmacy: req.params.pharmacyId,
    });
    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsByDoctor(req, res) {
  try {
    const prescriptions = await Prescription.find({
      doctor: req.params.doctorId,
    }).populate(['patient', 'pharmacy']);

    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsByPatient(req, res) {
  try {
    const prescriptions = await Prescription.find({
      patient: req.params.patientId,
    }).populate('doctor');
    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function createPrescriptions(req, res) {
  try {
    const { image, doctor, pharmacy, patient } = req.body;
    const prescription = await Prescription.create({
      image,
      doctor,
      pharmacy,
      patient,
      status: 'Assigned',
    });

    return res.json({ status: true, data: prescription });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
      //message: 'Unable to create prescriptions. Please try later.',
    });
  }
}

async function updatePrescriptions(req, res) {
  try {
    const { status, userType, prescriptionId } = req.body;

    if (userType !== 'pharmacy')
      throw new Error('Only pharmacy can update prescriptions');

    const prescription = await Prescription.findByIdAndUpdate(prescriptionId, {
      status,
    });

    return res.json({ status: true, data: prescription });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAllPrescriptions,
  getPrescriptionsByPharmacy,
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
  createPrescriptions,
  updatePrescriptions,
};
