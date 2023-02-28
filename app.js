const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Create multer instance
const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));

// Handle GET request for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle GET request for upload.html
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Handle POST request for uploading images
app.post('/upload', upload.array('images'), (req, res) => {
  res.redirect('/');
});

// Handle DELETE request for deleting an image
app.delete('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'images', filename);

  // Check if file exists
  if (fs.existsSync(filepath)) {
    // Delete file
    fs.unlinkSync(filepath);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
