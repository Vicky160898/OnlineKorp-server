const jwt = require("jsonwebtoken");

const isValid = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    console.log("token here..", token);
    if (!token) {
      return res.status(403).json({ message: "Bearer token missing" });
    }

    jwt.verify(token, process.env.privateKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token verification failed" });
      }
      console.log("token decoded data here.", decoded);
      req.body.userId = decoded._id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { isValid };
