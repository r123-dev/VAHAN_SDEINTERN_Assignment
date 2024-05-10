const mysql = require("mysql");
require('dotenv').config();
const dbConn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.User,  
  database: process.env.database,
  password: process.env.password
});

dbConn.connect((err) => {
  if (err) {
    console.error("Connection Failed:", err);
  } else {
    console.log("Connected");
  }
});

module.exports = dbConn;
