const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/controllers");
router.get("/", usercontroller.findAll);

router.post("/", usercontroller.create);



router.put("/:email", usercontroller.update);
router.delete("/:email", usercontroller.delete);

module.exports = router;