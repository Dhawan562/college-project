var express = require('express');
var app = express();
const Prescription = require('./models/prescription');
const { ObjectId } = require('mongodb');
const userRouter = require('./routes/users');
const prescriptionRouter = require('./routes/prescriptions');
const cors = require('cors');

var mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/Medical_Ordering_System')
  .then(() => console.log('DB CONNECTED'));

// for parsing application/json
app.use(express.json({ extended: false }));

//cors
app.use(cors());

// for parsing multipart/form-data
app.use(express.static('public'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/prescription', prescriptionRouter);

app.listen(3000, () => console.log('Server Started'));
