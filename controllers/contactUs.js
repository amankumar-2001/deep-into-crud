const { isValidEmail } = require("../utils/commonFunctions");
const contactUsService = require("../services/contactUs");

module.exports = {
  sentMailToOrganizer: async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    if (!isValidEmail(email)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await contactUsService.sentMailToOrganizer({
        firstName,
        lastName,
        email,
        message,
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
