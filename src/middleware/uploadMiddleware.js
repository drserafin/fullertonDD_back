const multer = require('multer');
const { resizeAndUploadImage } = require('../utils/imageUtil'); // Import the function from imageUtil

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image uploads
const handleImageUpload = async (req, res, next) => {
    console.log("Handling image upload for files:", req.files);

    try {
        const images = req.files; // Get the files from the request

        if (!images || images.length === 0) {
            console.log("No images uploaded, proceeding without changes to images.");
            return next(); // Proceed to the next middleware or route handler
        }

        const uploadedImageUrls = [];
        const uploadedFilenames = new Set(); // Track uploaded images

        // Loop through each image, resize, and upload to S3
        for (const image of images) {
            try {
                if (!uploadedFilenames.has(image.originalname)) {
                    const imageUrl = await resizeAndUploadImage(image); // Pass the entire image object
                    uploadedImageUrls.push(imageUrl); // Store the URL of the uploaded image
                    uploadedFilenames.add(image.originalname); // Mark this filename as uploaded
                } else {
                    console.log(`Duplicate image detected: ${image.originalname}`);
                }
            } catch (imageError) {
                console.error(`Error processing image ${image.originalname}:`, imageError);
                return res.status(500).json({ message: `Failed to process image: ${image.originalname}`, error: imageError.message });
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
