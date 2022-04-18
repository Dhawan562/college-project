const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ['doctor', 'patient', 'pharmacy'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
