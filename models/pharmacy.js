const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

let pharmacySchema = mongoose.Schema({
    pharmacyId: {
        type: ObjectId,
        required: true
    },
    patientId: {
        type: ObjectId,
        required: true
    }
});

let Pharmacy = module.exports = mongoose.model('Pharmacy', pharmacySchema);