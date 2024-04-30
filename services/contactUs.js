const contactUsModel = require("../models/emailModel");

const sentMailToOrganizer = async ({ firstName, lastName, email, message }) => {
  const response = await contactUsModel.insert({
    insertDict: { firstName, lastName, email, message },
  });

  if (!response) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return {
    ok: true,
    data: {},
  };
};

module.exports = {
  sentMailToOrganizer,
};
