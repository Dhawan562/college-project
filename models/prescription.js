const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

let prescriptionSchema = mongoose.Schema({
    createdById: {
        type: ObjectId,
        required: true
    },
    pharmacyId: {
        type: ObjectId,
        required: true
    },
    patientId: {
        type: ObjectId,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        required: true
    },
    completionDate: {
        type: Date,
        required: false
    }
});

let Prescription = module.exports = mongoose.model('Prescription', prescriptionSchema);