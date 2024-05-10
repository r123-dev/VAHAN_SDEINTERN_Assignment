"use strict";
//sconst funs = require('../controllers/controllers');
var dbConn = require("./../../config/connection");

const User = (user) => {
  this.name= user.name;
  this.email=user.email;
  this.mobileNumber=user.mobileNumber;
  this.dateOfBirth=user.dateOfBirth;
  
};

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("res.insertId");
      result(null, res.insertId,...newUser);
    }
  });
};

User.findAll = (result) => {
  dbConn.query("select * from user", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("result: ", res);
      result(null, res);
     // res.staus(201).send({message:"How are you"});
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE user SET name=?,email=?,mobileNumber=?,dateOfBirth=?",
    [
      user.name,
      user.email,
      user.mobileNumber,
      user.dob,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM user WHERE email=?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = {User};