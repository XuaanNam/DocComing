const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../configs/cloudinary');

cloudinary.config(config);

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
