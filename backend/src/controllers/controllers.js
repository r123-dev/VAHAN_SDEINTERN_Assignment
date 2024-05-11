"use strict";
//const User=require('../model/model');
//const { dateOfBirth } = require("../model/model");
var dbConn = require("./../../config/connection");
var User = require("../model/model").User;
// exports.findAll = function (req, res) {
//   User.findAll = (err, user) => {
//     console.log("controller");
//     if (err) {
//       res.send(err);
//       console.log("res", user);
//     }
//     else
//     res.send(user);
//   };
// };
exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) {
      console.log("error:", err);
      res.status(500).send({ error: true, message: "Internal Server Error" });
    } else {
      console.log("users:", users);
      res.status(200).send(users);
    }
  });
};
//const use = (user) =>
exports.create = function (req, res) {
  // const new_user = (req) => {

  //   this.name=req.body.name;
  //   this.email=req.body.email;
  //   this.mobileNumber=req.body.mobileNumber;
  //   this.dob=req.body.dob;
  // };
  dbConn.query('SELECT * FROM user WHERE id1 = ?', [req.body.id1], function (err, rows) {
    
    if (rows.length > 0) {
        // User with the same ID already exists
        return res.status(400).json({ error: true, message: 'User with the same ID already exists' });
    }
   else{
  const new_user = {
    id1:req.body.id1,
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    dateOfBirth: req.body.dateOfBirth
  };
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.create(new_user, function (err, user) {
      if (err)
         res.send(err);
      else{
      res.json({
        error: false,
        message: "data updated successfully",
        data: user,
      });}
    });
    }
}});}


// exports.update = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required fields" });
//   } else {
//     const updatedUser = new User(req.body.name, req.body.email, req.body.mobileNumber, req.body.dateOfBirth);
//     User.update(req.params.email, updatedUser, function (err, user) {
//       if (err) {
//         res.status(500).send({ error: true, message: "Internal Server Error" });
//       } else {
//         res.json({ error: false, message: "Data updated successfully" });
//       }
//     });
//   }
// };
// exports.update = function (req, res) {
//   // Validate that the 'name' field is not empty
//   if (!req.body.name) {
//     return res.status(400).send({ error: true, message: "Name field cannot be empty" });
//   }

//   // Proceed with updating the user record if 'name' is valid
//   const updatedUser = {
//     id: req.params.id,
//     name: req.body.name,
//     email: req.body.email,
//     mobileNumber: req.body.mobileNumber,
//     dateOfBirth: req.body.dateOfBirth
//   };

//   User.update(updatedUser, function (err, user) {
//     if (err) {
//       console.log("error:", err);
//       return res.status(500).send({ error: true, message: "Internal Server Error" });
//     }
//     else
//     res.status(200).send({ error: false, message: "User updated successfully" });
//   });
// };
exports.update=(req, res) => {
    
 // const id1 = req.body.id1;
  const customer = req.body;
  const customerObj = [
      customer.name,
      customer.email,
      customer.mobileNumber,
      customer.dateOfBirth
  ];

  if (isNaN(req.params.id1)) {
      return res.json('You must enter a valid id as a parameter');
  }

  if (!customer.name || !customer.email || !customer.mobileNumber || !customer.dateOfBirth) {
      return res.json({
          ErrorCode: 204,
          Message: 'Fields cannot be empty'
      });
  }

  let sqlQuery = `UPDATE user SET name = ?, email = ?, mobileNumber = ?, dateOfBirth = ? WHERE id1 = ${req.params.id1}`

  dbConn.query(sqlQuery, customerObj,  (error, result) => {
      if (error) throw error;
      if (result.affectedRow === 0) {
          res.send('No customer was updated');
      }
      res.json(`Customer with id ${req.params.id1} updated successfully`);
  });
};


exports.delete = function (req, res) {
  User.delete(req.params.id1, function (err, user) {
    if (err)
       res.send(err);
      
    res.json({ error: false, message: "data deleted successfully" });
  });
};