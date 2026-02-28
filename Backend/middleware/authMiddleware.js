const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  try {
    const verified = jwt.verify(token, "secretkey");
    req.admin = verified;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalid" });
  }
};