const express = require("express");
const app = express();
const mongoDB = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

mongoDB.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DataBase Connected Succesfully"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/users", userRoute);

app.listen("3000", () => {
  console.log("Wakeing Up the server B0$$");
});
