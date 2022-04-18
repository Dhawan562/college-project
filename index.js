var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
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
app.use(bodyParser.json());

//cors
app.use(cors());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

app.use('/api/v1/user', userRouter);
app.use('/api/v1/prescription', prescriptionRouter);

app.listen(3000, () => console.log('Server Started'));
