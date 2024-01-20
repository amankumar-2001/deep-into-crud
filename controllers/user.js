const { isValidEmail } = require("../utils/commonFunctions");
const userService = require("../services/user");

module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email id is not valid" });
    }

    try {
      const response = await userService.addUser({
        name,
        email,
        password,
      });

      if (response) {
        return res.status(200).json({ ok: true, res: response });
      }

      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    } catch (e) {
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.query;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email id is not valid" });
    }

    try {
      const response = await userService.getUserByEmailIdAndPassword({
        email,
        password,
      });
      if (response) {
        return res.status(200).json({ ok: true, res: response });
      }
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    } catch (e) {
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    }
  },
};
