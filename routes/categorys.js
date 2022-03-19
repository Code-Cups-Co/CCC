const router = require("express").Router();
const Categorys = require("../models/Categorys");

router.post("/", async (req, res) => {
  const newCat = new Categorys(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const categorys = await Categorys.find();
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
