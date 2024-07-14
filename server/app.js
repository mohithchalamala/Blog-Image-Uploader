const express = require('express');
const mongoose = require('mongoose');
const Uploadmodel = require('./model_data');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/Images', express.static('./Images'));

mongoose.connect('mongodb+srv://mohithchalamala:16461646@cluster0.778x2cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000);
  })
  .catch(e => {
    console.log(`Error Encountered ${e}`);
  });

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './Images');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File Filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) { // Ensure correct MIME type check
    callback(null, true);
  } else {
    callback(new Error("Only images allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: isImage
});

app.post('/register', upload.single("photo"), async (req, res) => {
  const file = req.file;
  const username = req.body.username;

  if (!file || !username) {
    return res.status(401).json({ status: 401, message: "Fill all the data" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD"); // Generate the date
    const x = new Uploadmodel({ // Entering the data to save in MongoDB
      username: username,
      file: file.filename, // Save the filename, not the entire file object
      date: date
    });

    const finaldata = await x.save(); // Save to MongoDB

    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//user data get

app.get('/getdata', async (req, res) => {
  try {
    const getuser = await Uploadmodel.find(); // Ensure correct model name
    res.status(200).json({ status: 200, getuser }); // Use status 200 for success
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Internal Server Error' }); // Use status 500 for server error
  }
});