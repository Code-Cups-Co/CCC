const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);
    !user && res.status(400).json("Bad credentials");

    const validated = await bcrypt.compare(res.body.password, user.password);
    !validated && res.status(400).json("Bad credentials");

    res.status(200).json(user);
    console.log(res.status(200).json(user));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
