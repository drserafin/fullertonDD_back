const sharp = require('sharp');
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify your uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename
    },
});
const upload = multer({ storage: storage });

// Resize image after uploading
const resizeImage = async (filePath) => {
    await sharp(filePath)
        .resize(1000, 1000) // Resize to 1000x1000 pixels
        .toFile(filePath); // Save the resized image
};


module.exports = upload;
