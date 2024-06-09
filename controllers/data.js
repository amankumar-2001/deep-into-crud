const dataService = require("../services/data");
const { isValidObjectId } = require("mongoose");

module.exports = {
  storeDriveData: async (req, res) => {
    const { userId, typeOfData, data, metaData } = req.body;
    if (!isValidObjectId(userId)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await dataService.storeDriveData({
        userId,
        typeOfData,
        data: data || "",
        file: req?.file || {},
        metaData,
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
  editDriveData: async (req, res) => {
    const { userId, contentId, typeOfData, data, toDelete } = req.body;

    if (!isValidObjectId(userId)) {
      return res
        .status(200)
        .json({ ok: false, message: "Email id is not valid" });
    }

    try {
      const response = await dataService.editDriveData({
        contentId,
        typeOfData,
        data: data || "",
        toDelete,
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
  getDriveData: async (req, res) => {
    const { userId, typeOfData } = req.query;
    if (!isValidObjectId(userId)) {
      return res.status(200).json({ ok: false, message: "Not a valid user." });
    }
    try {
      const response = await dataService.getDriveDataByUser({
        userId,
        typeOfData,
        isDeleted: false,
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
  getExploreData: async (req, res) => {
    const { limit } = req.query;
    
    try {
      const response = await dataService.getExploreData({
        limit,
        isDeleted: false,
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
  getBinData: async (req, res) => {
    const { userId } = req.query;
    if (!isValidObjectId(userId)) {
      return res.status(200).json({ ok: false, message: "Not a valid user." });
    }
    try {
      const response = await dataService.getDriveDataByUser({
        userId,
        isDeleted: true,
        groupBy: "date",
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
