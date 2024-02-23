const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    typeOfData: {
      type: String,
      required: true,
      enum: ["Blog", "Note", "Image", "File"],
    },
    data: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
    },
    metaData: {},
  },
  {
    timestamps: true,
  }
);

const DataModel = mongoose.model("driveData", dataSchema, "driveData");

module.exports = {
  insert: ({ insertDict }) => DataModel(insertDict).save(),
  updateOne: ({ filter, update, options = {} }) =>
    DataModel.updateOne(filter, update, options),
  find: ({ query }) => DataModel.find(query),
  findByUserId: async ({ query }) => {
    const pipeline = [
      {
        $match: {
          userId: new ObjectId(query.userId),
          isDeleted: false,
          ...(query.typeOfData ? { typeOfData: query.typeOfData } : {}),
        },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          typeOfData: 1,
          data: 1,
          metaData: 1,
          contentId: "$_id",
        },
      },
    ];
    const result = await DataModel.aggregate(pipeline);
    const response = {
      items: { Blog: [], Note: [], Image: [], File: [] },
      totalLength: 0,
    };
    for (const item of result) {
      response.items[item.typeOfData].push(item);
      response.totalLength += 1;
    }
    return response;
  },
};
