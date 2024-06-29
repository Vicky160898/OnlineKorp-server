const cron = require("node-cron");
const moment = require("moment");
const UserModel = require("../users/models/User");

const cronExpression = process.env.CRONSCHEDULAR; // Runs every minute

const cronJob = () => {
  const task = cron.schedule(cronExpression, async () => {
    let today_date = moment().format("YYYY-MM-DD HH:mm"); // Use 24-hour format
    console.log("Running a cron job every minute", today_date);

    try {
      const users = await UserModel.find();
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        const nextPaymentDate = moment(
          user?.next_payment_date,
          "YYYY-MM-DD HH:mm"
        );
        const todayDate = moment(today_date, "YYYY-MM-DD HH:mm");
        console.log(
          "date checker here..",
          todayDate.isSameOrBefore(nextPaymentDate, "minute")
        );
        if (todayDate.isSameOrBefore(nextPaymentDate, "minute")) {
          let find_user = await UserModel.findById(user._id);
          find_user.planStatus = "inactive";
          await find_user.save();
          console.log(`User [${user._id}] plan status updated to inactive.`);
        }
      }
      console.log("All users checked and updated if necessary.");
    } catch (error) {
      console.error("Error fetching or updating users:", error);
    }
  });

  // Handle errors and exceptions
  task.on("error", (err) => {
    console.error("Error running cron job:", err);
  });
};

module.exports = { cronJob };
