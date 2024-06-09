const express = require("express");
const router = express.Router();
const user = require("./controllers/user");
const drive = require("./controllers/data");
const contactUs = require("./controllers/contactUs");
const { upload } = require("./utils/commonFunctions");
const { authenticateUser } = require("./middlewares");

router.post("/register/user", user.addUser);

router.post("/login/user", user.login);

router.post(
  "/edit/profile",
  authenticateUser,
  upload.single("file"),
  user.editProfile
);

router.post(
  "/add/data",
  authenticateUser,
  upload.single("file"),
  drive.storeDriveData
);

router.post("/edit/data", authenticateUser, drive.editDriveData);

router.get("/drive/data/byUserId", authenticateUser, drive.getDriveData);

router.get("/drive/explore", authenticateUser, drive.getExploreData);

router.get("/drive/landing/explore", drive.getExploreData);

router.get("/bin/data", authenticateUser, drive.getBinData);

router.post("/contact-us/message", contactUs.sentMailToOrganizer);

module.exports = router;
