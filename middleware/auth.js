import jwt from "jsonwebtoken";

 const auth = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is missing or invalid" });
  }
  const token = authheader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token failed to verify" });
    req.user = decoded;
    next();
  });
};

export default auth;
