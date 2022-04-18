const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

let prescriptionSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Assigned', 'Dispatched', 'Delivered', 'Cancelled'],
      required: true,
    },
    doctor: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    pharmacy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    patient: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
