const express = require("express");
const router = express.Router();
const user = require("./controllers/user");
const drive = require("./controllers/data");
const { upload } = require("./utils/commonFunctions");

router.post("/register/user", user.addUser);

router.get("/login/user", user.login);

router.post("/add/data", upload.single("file"), drive.storeDriveData);

router.post("/edit/data", drive.editDriveData);

router.get("/drive/data/byUserId", drive.getDriveData);

module.exports = router;
