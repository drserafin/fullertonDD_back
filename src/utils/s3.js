const { S3 } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const path = require('path');

// Create an S3 client
const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Function to upload an image to S3
const uploadImageToS3 = async (file) => {
    const params = {
        Bucket: 'fullerton-deal-depot-product-images', // Your S3 bucket name
        Key: Date.now() + path.extname(file.originalname), // Unique filename in S3
        Body: file.buffer, // The file content
        ContentType: file.mimetype, // File MIME type (e.g., image/jpeg)
    };

    try {
        await s3.putObject(params);
        return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`; // Construct URL
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('Error uploading image');
    }
};

// Function to resize and upload images
const resizeAndUploadImage = async (buffer, originalname, mimetype) => {
    const resizedBuffer = await sharp(buffer)
        .resize(1000, 1000) // Resize to 1000x1000 pixels
        .toBuffer();

    return await uploadImageToS3({ originalname, buffer: resizedBuffer, mimetype });
};

// Export the S3 client and utility functions
module.exports = {
    s3, // Export the S3 client
    uploadImageToS3,
    resizeAndUploadImage,
};
