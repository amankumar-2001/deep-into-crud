const userModel = require("../models/userModel");

const addUser = async ({ name, email, password }) => {
  const user = await getUserByEmailIdAndPassword({ email, password });

  if (user && user?.ok) {
    return { ok: false, data: {}, err: "Email already in use!!" };
  }

  const response = await userModel.insert({
    insertDict: { name, email, password },
  });

  if (!response) {
    return {
      ok: false,
      data: {},
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return { ok: true, data: response, err: "" };
};

const getUserByEmailIdAndPassword = async ({ email, password }) => {
  const response = await userModel.findOne({
    query: { email, password },
  });

  if (!response) {
    return {
      ok: false,
      data: {},
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return { ok: true, data: response, err: "" };
};

module.exports = {
  addUser,
  getUserByEmailIdAndPassword,
};
