const express = require("express");
const router = express.Router();
const app = express();
const user = require("./user");
const food = require("./food");

router.use("/user", user);
router.use("/food", food);

module.exports = router;
