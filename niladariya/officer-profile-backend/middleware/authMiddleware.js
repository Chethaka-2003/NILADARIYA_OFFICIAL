const jwt = require("jsonwebtoken");
const Officer = require("../models/Officerbackend");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Officer.findById(decoded.id).select("-password");
      if (!req.user) throw new Error();
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { protect };
