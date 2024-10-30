const multer = require('multer');
const { resizeAndUploadImage } = require('../utils/s3');

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image uploads
const handleImageUpload = async (req, res, next) => {
    console.log("Handling image upload for files:", req.files);

    try {
        const images = req.files; // Get the files from the request

        if (!images || images.length === 0) {
            return res.status(400).json({ message: 'No images uploaded.' });
        }

        const uploadedImageUrls = [];
        const uploadedFilenames = new Set(); // Track uploaded images

        // Loop through each image, resize, and upload to S3
        for (const image of images) {
            if (!uploadedFilenames.has(image.originalname)) {
                const imageUrl = await resizeAndUploadImage(image.buffer, image.originalname, image.mimetype);
                uploadedImageUrls.push(imageUrl); // Store the URL of the uploaded image
                uploadedFilenames.add(image.originalname); // Mark this filename as uploaded
            } else {
                console.log(`Duplicate image detected: ${image.originalname}`);
            }
        }

        req.body.images = uploadedImageUrls; // Set the uploaded image URLs in the request body
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error handling image upload:', error);
        res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
};

// Export upload middleware and the handleImageUpload function for routes
module.exports = {
    upload: upload.array('images', 10), // Allow multiple images
    handleImageUpload,
};
