const connection = require("./config/connection");
const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

// app.get("/", (req, res) => {
//  res.json("how are you");
// });
app.use(express.json());
const userRoutes = require("./src/routes/routes");

app.use("/api/entry", userRoutes);


app.listen(3000, () => {
  console.log("listening on port 3000");
});