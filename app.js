require("dotenv").config();

const { mongooseLoader, expressApp } = require("./loaders");
const { cronJob } = require("./modules/Cron-job");

// get port from env else default to 5000
const PORT = process.env.PORT || 5000;

//cron-job-method.
//cronJob();

// load components
console.log("➡️ Starting to load components in main app");
mongooseLoader();

expressApp.listen(PORT, "localhost", () => {
  console.log(`✅ OnlineKorp server is listening on port ${PORT}.`);
});
