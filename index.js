const express = require("express");
const app = express();
const mongoDB = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categorys");
const multer = require("multer");

mongoDB.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DataBase Connected Succesfully"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, fule, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, "icon2.png");
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categorys", categoryRoute);

app.listen("3000", () => {
  console.log("Wakeing Up the server B0$$");
});
