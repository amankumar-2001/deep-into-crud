const { isValidEmail } = require("../utils/commonFunctions");
const userService = require("../services/user");

module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (!isValidEmail(email)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await userService.addUser({
        name,
        email,
        password,
      });

      if (response.ok) {
        return res.status(200).json({ ok: true, data: response.data });
      }

      return res.status(200).json({ ok: false, message: response.err });
    } catch (e) {
      return res
        .status(200)
        .json({ ok: false, message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await userService.getUserByEmailIdAndPassword({
        email,
        password,
      });

      if (response.ok) {
        return res
          .status(200)
          .cookie("token", response.data.token, {
            sameSite: "None",
            secure: true,
          })
          .json({
            ok: true,
            data: {
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              userId: response.data.userId,
              profileImage: response.data.profileImage,
            },
          });
      }

      return res.status(200).json({ ok: false, message: response.err });
    } catch (e) {
      return res
        .status(200)
        .json({ ok: false, message: "Internal server error" });
    }
  },

  editProfile: async (req, res) => {
    const {
      userId,
      firstName,
      lastName,
      prevEmail,
      email,
      password,
      prevPassword,
    } = req.body;

    if (!isValidEmail(email)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await userService.editProfile({
        userId,
        firstName,
        lastName,
        email,
        password,
        prevEmail,
        profileImage: req?.file || "",
        prevPassword,
      });

      if (response.ok) {
        return res.status(200).json({ ok: true, data: response.data });
      }

      return res.status(200).json({ ok: false, message: response.err });
    } catch (e) {
      return res
        .status(200)
        .json({ ok: false, message: "Internal server error" });
    }
  },
};
