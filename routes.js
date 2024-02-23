const express = require("express");
const router = express.Router();
const user = require("./controllers/user");
const drive = require("./controllers/data");
const { upload } = require("./utils/commonFunctions");
const { authenticateUser } = require("./middlewares");

router.post("/register/user", user.addUser);

router.post("/login/user", user.login);

router.post(
  "/add/data",
  authenticateUser,
  upload.single("file"),
  drive.storeDriveData
);

router.post("/edit/data", authenticateUser, drive.editDriveData);

router.get("/drive/data/byUserId", authenticateUser, drive.getDriveData);

module.exports = router;
