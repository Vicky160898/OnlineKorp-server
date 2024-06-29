require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `documents/${Date.now()}_${file.originalname}`); // Example key generation logic
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/svg",
      "application/pdf",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(null, false); // Reject file
    }
  },
});

// Error handling middleware for multer
uploadFile.anyErrorHandler = function (err, req, res, next) {
  console.error("Multer error:", err);
  res.status(500).json({ error: "Error uploading file." });
};

// const uploadFile = multer({
//   storage: multerS3({
//     s3,
//     bucket: bucketName,
//     metadata: (req, file, cb) => {
//       console.log("file entering into the multers", file);
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       cb(null, `documents/${Date.now()}_${file.originalname}`); // Example key generation logic
//     },
//   }),
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep the original filename
//   },
// });

// const uploadFile = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     // Allow only images and PDF files
//     const allowedMimes = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "application/pdf",
//     ];
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true); // Accept file
//     } else {
//       cb(null, false); // Reject file
//     }
//   },
// });

module.exports = { uploadFile };
