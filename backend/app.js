const connection = require("./config/connection");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
                                  

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRoutes = require("./src/routes/routes");

app.use("/api/entry", userRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});