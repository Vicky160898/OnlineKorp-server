const UserModel = require("./models/User");

const checkPlanValidity = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    // Fetch user from database
    const user = await UserModel.findById(userId);
    // Check if user has a valid plan
    if (!user || !user.plan || user.planExpiresAt < new Date()) {
      return res
        .status(403)
        .json({ message: "Plan expired. Please renew your plan." });
    }
    // Optionally, you can attach plan details to the request for further processing
    req.userPlan = {
      planType: user.plan,
      planExpiresAt: user.planExpiresAt,
    };
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error checking plan validity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkPlanValidity };
