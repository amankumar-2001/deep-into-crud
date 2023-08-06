const express = require("express");
const router = express.Router();
const Data = require("../models/dataModel");

router.post("/", async (req, res) => {
  const newData = new Data({
    user: req.body.user,
    typeOfData: req.body.type,
    data: req.body.data,
  });
  try {
    const result = await newData.save();
    res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Data.find(res?.body);
    res.send(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/dataById", async (req, res) => {
  const dataId = req.body.dataId;
  try {
    const data = await Data.findById(dataId);
    res.send(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Data.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
