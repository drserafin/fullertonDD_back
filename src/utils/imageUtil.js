const sharp = require('sharp');
const { uploadImageToS3 } = require('./s3'); // Correct path to s3.js

// Function to resize and upload an image to S3
const resizeAndUploadImage = async (file) => {
    const { originalname, buffer, mimetype } = file;

    // Resize the image to 1000x1000 pixels
    const resizedBuffer = await sharp(buffer)
        .resize(1000, 1000, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toBuffer();

    // Upload the resized image to S3
    return await uploadImageToS3({ originalname, buffer: resizedBuffer, mimetype });
};

module.exports = {
    resizeAndUploadImage,
};
