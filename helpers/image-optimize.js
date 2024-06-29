require("dotenv").config();
const sharp = require("sharp");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

// Function to optimize and resize image
// const optimizeImage = async (inputPath, outputPath, mimeType) => {
//   await sharp(inputPath)
//     .resize({ width: 800, height: 600, fit: "inside" })
//     .toFormat(mimeType.split("/")[1])
//     .jpeg({ quality: 90 })
//     .toFile(outputPath);
// };

const optimizeAndUploadImage = async (inputPath, outputPath, mimeType) => {
  try {
    // Optimizing image
    const optimizedImage = await sharp(inputPath)
      .resize({ width: 800, height: 600, fit: "inside" })
      .toFormat(mimeType.split("/")[1])
      .jpeg({ quality: 90 })
      .toBuffer();

    console.log("optimizedImage url here", optimizedImage);

    // Upload optimized image to S3
    const params = {
      Bucket: bucketName,
      Key: outputPath,
      Body: optimizedImage,
      ContentType: mimeType, // Adjust according to your file type
    };

    const data = await s3.upload(params).promise();
    console.log("Optimized image uploaded to S3:", data.Location, data.Key);

    return data.Location; // Return S3 URL
  } catch (error) {
    console.error("Error optimizing and uploading image:", error);
    throw error;
  }
};

module.exports = { optimizeAndUploadImage };
