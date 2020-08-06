const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ msg: "Not Authorized , Invalid token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    // console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.msg);
    return res.status(401).json({ msg: "Not Authorized , Invalid token" });
  }
};

module.exports = auth;
