const Prescription = require('../models/prescription');
const fs = require('fs');
const path = require('path');

async function getAllPrescriptions(req, res) {
  try {
    const prescriptions = await Prescription.find();
    if (!prescriptions.length) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsForPharmacy(req, res) {
  try {
    const prescriptions = await Prescription.find({
      pharmacy: req.params.pharmacyId,
    })
      .populate(['doctor', 'patient'])
      .sort({ createdAt: 'desc' });

    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    prescriptions.map((prescription) => {
      if (prescription.image) {
        try {
          const img = fs.readFileSync(
            path.join(__dirname, `../prescriptions/${prescription.image}`)
          );
          var string64 = img.toString('base64');

          prescription.image = string64;
        } catch (error) {
          console.log(error.message);
        }
      }
    });
    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsForDoctor(req, res) {
  try {
    const prescriptions = await Prescription.find({
      doctor: req.params.doctorId,
    })
      .populate(['patient', 'pharmacy'])
      .sort({ createdAt: 'desc' });

    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function getPrescriptionsForPatient(req, res) {
  try {
    const prescriptions = await Prescription.find({
      patient: req.params.patientId,
    })
      .populate('doctor')
      .sort({ createdAt: 'desc' });
    prescriptions.map((prescription) => {
      try {
        const img = fs.readFileSync(
          path.join(__dirname, `../prescriptions/${prescription.image}`)
        );

        var string64 = img.toString('base64');
        prescription.image = string64;
      } catch (error) {
        console.log(error.message);
      }
    });
    if (prescriptions.length === 0) throw new Error('No prescriptions found.');

    return res.json({ status: true, data: prescriptions });
  } catch (error) {
    return res.json({ status: false, message: 'No prescriptions found.' });
  }
}

async function createPrescriptions(req, res) {
  try {
    const { doctor, pharmacy, patient } = req.body;
    const prescription = await Prescription.create({
      image: req.file.filename,
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

async function cancelPrescriptionById(req, res) {
  try {
    await Prescription.findByIdAndUpdate(req.params.id, {
      status: 'Cancelled',
    });

    return res.json({ status: true });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Not able to cancel the prescription',
    });
  }
}

module.exports = {
  getAllPrescriptions,
  getPrescriptionsForPharmacy,
  getPrescriptionsForDoctor,
  getPrescriptionsForPatient,
  createPrescriptions,
  updatePrescriptions,
  cancelPrescriptionById,
};
