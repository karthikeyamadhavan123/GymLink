const jwt = require("./jwt.js");

function tokenVerification(req, res, next) {
  try {
    const token = req.cookies.login; // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const secret = process.env.SECRET_KEY;
    const decoded = jwt.verifyToken(token, secret);
    req.userId = decoded; // Attach decoded user ID to request
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = tokenVerification;
