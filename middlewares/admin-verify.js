const jwt = require("jsonwebtoken");

const isValidAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Bearer token missing" });
    }

    jwt.verify(token, process.env.privateKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token verification failed" });
      }

      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized: Not an admin" });
      }
      req.body.userId = decoded._id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { isValidAdmin };
