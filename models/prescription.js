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
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        //Number or String depending if we are using enum
        type: String,
        required: true
    },
    completionDate: {
        type: Date,
        required: false
    }
});

let Prescription = module.exports = mongoose.model('Prescription', prescriptionSchema);