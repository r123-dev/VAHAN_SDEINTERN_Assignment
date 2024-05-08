"use strict";
const User = require("../model/model");
exports.findAll = function (req, res) {
  User.findAll = (err, user) => {
    console.log("controller");
    if (err) {
      res.send(err);
      console.log("res", user);
    }
    res.send(user);
  };
};
//const use = (user) =>
exports.create = function (req, res) {
  const new_user = (req) => {

    this.name=req.body.name;
    this.email=req.body.email;
    this.mobileNumber=req.body.mobileNumber;
    this.dob=req.body.dob;
  };
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.create(new_user, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "data updated successfully",
        data: user,
      });
    });
  }
};


exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .second({ error: true, message: "Please prvide all required field" });
  } else {
    User.update(req.params.id, new User(req.body), function (err, user) {
      if (err) res.send(err);
      res.json({ error: false, message: "data updated successfully" });
    });
  }
};

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "data deleted successfully" });
  });
};