const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/controllers");
router.get("/", usercontroller.findAll);

router.post("/", usercontroller.create);



router.put("/:id", usercontroller.update);
router.delete("/:id", usercontroller.delete);

module.exports = router;