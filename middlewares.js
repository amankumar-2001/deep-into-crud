const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(200)
        .json({ ok: false, tokenError: true, message: "Token is Missing" });
    } else {
      const auth = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (auth) {
        next();
      } else {
        res
          .status(200)
          .json({ ok: false, tokenError: true, message: "Auth Failed!!" });
      }
    }
  } catch (err) {
    res.status(200).json({ ok: false, tokenError: true, message: err.message });
  }
};

module.exports = { authenticateUser };
