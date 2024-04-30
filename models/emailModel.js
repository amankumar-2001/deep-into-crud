const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUsModel = mongoose.model(
  "userContactUsEmail",
  emailSchema,
  "userContactUsEmail"
);

module.exports = {
  insert: ({ insertDict }) => ContactUsModel(insertDict).save(),
  findOne: ({ query }) => ContactUsModel.findOne(query),
  updateOne: ({ filter, update, options = {} }) =>
    ContactUsModel.updateOne(filter, update, options),
};
