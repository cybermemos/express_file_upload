
/*
	This is the API Gateway implemented using express.js .
	Read more: https://cybermemos.com/developent/how-to-upload-files-to-microservices/
	*/


const express = require('express');
// Dependency to allow file uploads.
const fileUpload = require('express-fileupload');
// Dependency to allow CORS requests.
const cors = require('cors')


// Port number
const PORT = 8080;

// Upload location
const PATH = './uploaded_data';

// Initialize the express instance.

const app = express();

// Use Fileupload plugin with default options.
app.use(fileUpload());

// Allow Cross-Origin access to the service
app.use(cors());

app.listen(PORT, () => {
  console.log('Server up & running on Port :', PORT);
})

// process the upload files
app.post('/upload', function (req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).send('missing file details.');
  }

  // Iterate through the list of files.

  let files = Object.keys(req.files);
  for (let index = 0, length = files.length; index < length; index++) {

    console.log(`Processing the file : ${files[index]}`);

    // Generate a random file name
    let newFileName = Math.floor(new Date() / 1000);

    // Saving the file to storage
    storeFiles(req.files[files[index]], newFileName);
  }

  res.status(200).send('file uploaded');
});

// Storing the file to storage.
storeFiles = function (sourceFile, newFileName) {

  return new Promise((resolve, reject) => {

    // Use the mv() method to store the file to the Harddrive.
    sourceFile.mv(`${PATH}/${newFileName}.png`, function (err) {
      if (err) {
        reject("error");
      } else {
        resolve("")
      }
    });

  });
}