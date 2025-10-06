// middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Access denied: not an admin" });

    req.user = decoded;
    next();
  });
};
