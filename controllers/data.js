const dataService = require("../services/data");
const { isValidObjectId } = require("mongoose");

module.exports = {
  storeDriveData: async (req, res) => {
    const { userId, typeOfData, data, metaData } = req.body;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Email id is not valid" });
    }

    try {
      const response = await dataService.storeDriveData({
        userId,
        typeOfData,
        data: data || "",
        file: req?.file || {},
        metaData,
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
  editDriveData: async (req, res) => {
    const { userId, contentId, typeOfData, data, toDelete } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Email id is not valid" });
    }
    
    try {
      const response = await dataService.editDriveData({
        contentId,
        typeOfData,
        data: data || "",
        toDelete,
      });

      if (response) {
        return res.status(200).json({ ok: true, res: response });
      }

      return res
        .status(500)
        .json({ ok: false, message: "Internal server error1" });
    } catch (e) {
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    }
  },
  getDriveData: async (req, res) => {
    const { userId, typeOfData } = req.query;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Not a valid user." });
    }
    try {
      const response = await dataService.getDriveDataByUser({
        userId,
        typeOfData,
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
