const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined in .env");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};