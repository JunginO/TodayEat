const express = require("express");
const router = express.Router();
const app = express();
const user = require("./user");
const food = require("./food");
const diary = require("./diary");

router.use("/user", user);
router.use("/food", food);
router.use("/diary", diary);

module.exports = router;
