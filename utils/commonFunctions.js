const multer = require("multer");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function isValidObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  isValidEmail,
  isValidObjectId,
  upload,
};
