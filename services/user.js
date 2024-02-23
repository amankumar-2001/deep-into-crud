const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const addUser = async ({ name, email, password }) => {
  const user = await userModel.findOne({ query: { email } });
  if (user) {
    return { ok: false, err: "Email already in use!!" };
  }

  const encrypt = await bcrypt.hash(password, 10);

  const response = await userModel.insert({
    insertDict: { name, email, password: encrypt },
  });

  if (!response) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return {
    ok: true,
    data: {
      name: response.name,
      email: response.email,
      userId: response._id,
    },
  };
};

const getUserByEmailIdAndPassword = async ({ email, password }) => {
  const response = await userModel.findOne({
    query: { email },
  });

  if (!response) {
    return { ok: false, err: "User does not exist!!" };
  }

  const authenticate = bcrypt.compareSync(password, response.password);

  if (!authenticate) {
    return { ok: false, err: "Wrong Password!!" };
  }

  const token = jwt.sign(
    { email: response.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  if (!token) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return {
    ok: true,
    data: {
      token,
      name: response.name,
      email: response.email,
      userId: response._id,
    },
  };
};

module.exports = {
  addUser,
  getUserByEmailIdAndPassword,
};
