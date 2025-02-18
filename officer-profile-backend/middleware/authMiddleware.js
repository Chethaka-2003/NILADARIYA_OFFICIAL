const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.officer = verified; // Attach officer info to request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authenticate;