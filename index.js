var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Medical_Ordering_System');
const User = require('./models/user');
const Prescription = require('./models/prescription');
const Pharmacy = require('./models/pharmacy');
const { ObjectId } = require('mongodb');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

// SET STORAGE
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
   }
 });

var upload = multer({ storage: storage });

app.get('/', function (req, res) {
   res.render('form');
});

app.get('/user', function (req, res) {
   res.render('user');
});

// Get all Prescriptions
app.get('/prescriptions', function (req, res) {
   Prescription.find(function (err, response) {
      return res.json(response);
   });
});

// Put a new Prescription
app.post('/prescription', upload.single('image'), function (req, res) {
   var prescriptionInfo = req.body; //Get the parsed information

   var newPrescription = new Prescription({
      createdById: ObjectId(prescriptionInfo.createdById),//ObjectId("6255f33fe5c09594bb9462e9")
      pharmacyId: ObjectId(prescriptionInfo.pharmacyId),//ObjectId("6259e8cbdb14b6fb73ba7c67")
      patientId: ObjectId(prescriptionInfo.patientId),//ObjectId("6259e8bedb14b6fb73ba7c66")
      creationDate: Date.now(),
      image: { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype },
      status: "Pending"
   });

   newPrescription.save(function (err, Prescription) {
      console.log(err);
      if (err)
         res.render('show_message', { message: "Database error", type: "error" });
      else
         res.render('show_message', {
            message: "New prescription added", type: "success", user: prescriptionInfo
         });
   });
});

// Update Prescription status and completion Date
app.put('/prescription/:id', function (req, res) {
   Prescription.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
      if (err) res.json({ message: "Error in updating user with id " + req.params.id });
      return res.json(response);
   });
});

// Get Prescription By Id
app.get('/prescription/:id', function (req, res) {
   Prescription.findById(req.params.id, function (err, response) {
      return res.json(response);
   });
});

// Get Prescription By Doctor Id
app.get('/prescriptions/doctor/:id', function (req, res) {
   Prescription.find({ createdById: ObjectId(req.params.id) }, function (err, response) {
      return res.json(response);
   });
});

// Get Prescription By Patient Id
app.get('/prescriptions/patient/:id', function (req, res) {
   Prescription.find({ patientId: ObjectId(req.params.id) }, function (err, response) {
      return res.json(response);
   });
});

// Get Prescription By Pharmacy Id
app.get('/prescriptions/pharmacy/:id', function (req, res) {
   Prescription.find({ pharmacyId: ObjectId(req.params.id) }, function (err, response) {
      return res.json(response);
   });
});

// Get User By Id
app.get('/user/:id', function (req, res) {
   User.findById(req.params.id, function (err, response) {
      return res.json(response);
   });
});

// Get User By Type - Example Get All Pharmacies and Patients
app.get('/user/type/:type', function (req, res) {
   User.find({ type: req.params.type }, function (err, response) {
      return res.json(response);
   });
});

app.post('/user/login', function (req, res) {
   var userCredentials = req.body; //Get the parsed information
   if (!userCredentials.username || !userCredentials.password || !userCredentials.type) {
      return res.status(400).send({
         message: "You've entered an invalid username / password combination"
      });
   } else {
      User.find({ username: userCredentials.username, password: userCredentials.password, type: userCredentials.type }, function (err, response) {
         if (response) {
            return res.json(response);
         } else {
            return res.status(400).send({
               message: "You've entered an invalid username / password combination"
            });
         }
      });
   }
});

app.get('/pharmacybypatient/:id', function (req, res) {
   Pharmacy.find({ patientId: req.params.id }, function (err, response) {
      let pharmacies = [];
      response.forEach(entry => {
         pharmacies.push(entry.pharmacyId);
      });
      return res.json(pharmacies);
   });
});

app.listen(3000);