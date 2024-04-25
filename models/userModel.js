const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema, "users");

module.exports = {
  insert: ({ insertDict }) => UserModel(insertDict).save(),
  findOne: ({ query }) => UserModel.findOne(query),
  updateOne: ({ filter, update, options = {} }) =>
    UserModel.updateOne(filter, update, options),
};
