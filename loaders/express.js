require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgon = require("morgan");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors());
app.use(morgon("tiny"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.disable("x-powered-by");
app.use(express.static("public"));

// Serve static files from the uploads directory
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep the original filename
//   },
// });

// Multer upload instance with storage and file filter
// const upload = multer({
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

const {
  UserModules,
  BankAccountModules,
  SubscriptionModules,
  PremiumVisaModules,
} = require("../modules");
const { userAuthorization } = require("../middlewares");
const { optimizeImage } = require("../helpers/image-optimize");

app.use("/api/user", UserModules.route);
app.use("/api/account", userAuthorization.isValid, BankAccountModules.route);
app.use("/api/subscription", SubscriptionModules.route);
app.use(
  "/api/premium/visa",
  userAuthorization.isValid,
  PremiumVisaModules.route
);

// File upload route
// app.post("/upload/file", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     console.log("File details:", req.file);

//     if (req.file.mimetype.startsWith("image/")) {
//       // If uploaded file is an image, optimize it
//       const optimizedImagePath = `uploads/optimized-${req.file.filename}`;
//       await optimizeImage(req.file.path, optimizedImagePath, req.file.mimetype);
//       console.log("Optimized image saved at:", optimizedImagePath);
//       res.status(200).send(optimizedImagePath);
//     } else if (req.file.mimetype === "application/pdf") {
//       // If uploaded file is a PDF, save it as is
//       const uploadedPdfPath = `uploads/${req.file.filename}`;
//       console.log("Uploaded PDF saved at:", uploadedPdfPath);
//       res.status(200).send(uploadedPdfPath);
//     } else {
//       // Unsupported file type
//       return res.status(400).send("Unsupported file type.");
//     }
//   } catch (error) {
//     console.error("Error occurred:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.use(function (req, res) {
  return res.status(404).json("Resource not found");
});

app.use(function (err, req, res, next) {
  console.log(err);
  if (err.code) {
    res.status(err.code).json({
      name: err.name,
      message: err.message,
    });
  } else {
    res.status(500).json({
      name: "SOMETHING_WENT_WRONG",
      message: "Something went wrong at server side while handling request.",
    });
  }
});

module.exports = app;
