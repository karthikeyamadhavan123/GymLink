const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_images',  // Folder where images are stored
        format: async (req, file) => {
            const ext = file.mimetype.split('/')[1];  // Extract extension from MIME type
            if (['jpeg', 'jpg', 'png'].includes(ext)) {
                return ext;  // Return valid format
            }
            return 'png';  // Default to 'png' if format not recognized
        },
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,  // Generate unique filename
    },
});
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "trainer_images", // Folder for storing trainer images
      format: async (req, file) => {
        const ext = file.mimetype.split("/")[1]; // Extract file extension
        return ["jpeg", "jpg", "png"].includes(ext) ? ext : "png"; // Default to PNG
      },
      public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
    },
  });
  const certificationStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "trainer_certifications", // Folder for storing certification files
      resource_type: "raw", // Required to handle PDF/DOCX
      format: async (req, file) => file.mimetype.split("/")[1], // Keep original file format
      public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
    },
  });
// Multer middleware setup
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB file size limit
});
const uploadTrainerImage = multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit for images
const uploadCertification = multer({ storage: certificationStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit for PDFs/DOCX


module.exports = {upload,uploadTrainerImage,uploadCertification};