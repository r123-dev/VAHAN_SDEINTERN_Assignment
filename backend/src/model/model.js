"use strict";
//sconst funs = require('../controllers/controllers');
var dbConn = require("./../../config/connection");

function User(user) {
  this.id1=user.id1,
  this.name = user.name;
  this.email = user.email;
  this.mobileNumber = user.mobileNumber;
  this.dateOfBirth = user.dateOfBirth;
}

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("res.insertId");
      result(null, res.insertId);
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
    // res.status(201).send({message:"How are you"});
    }
  });
};

// User.update = function (user, result) {
  
//   dbConn.query(
//     "UPDATE user SET name=?,email=?,mobileNumber=?,dateOfBirth=? WHERE id=?",
//     [
//       user.name,
//       user.email,
//       user.mobileNumber,
//       user.dateOfBirth,
//       user.id,
//     ],
//     function (err, res) {
//       if (err) {
//         console.log("error: ", err);
//        result(null, err);
//       res.status(500).send({ error: true, message: "Internal Server Error" });  
//     } else {
//     console.log("Updated rows:", res.affectedRows); // Log the number of updated rows
//        // return result(null, res); 
//        result(null, res);
//     //  console.log("successfully updated");
//        //res.status(201).send({ error: false, message: "Data updated successfully" });
//       }
//     }
//   );
// };
User.update = function (id1,user, result) {
  dbConn.query(
    "UPDATE user SET name=?, email=?, mobileNumber=?, dateOfBirth=? WHERE id1=?",
    [
      user.name,
      user.email,
      user.mobileNumber,
      user.dateOfBirth,
      id1
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Updated rows:", res.affectedRows);
        result(null, res);
        dbConn.query("COMMIT;", function(err, res) {
          if (err) {
              console.log("Error committing transaction:", err);
          } else {
              console.log("Transaction committed successfully.");
          }
      });
      }
    }
  );
};


User.delete = function (id1, result) {
  dbConn.query("DELETE FROM user WHERE id1=?", [id1], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = {User};