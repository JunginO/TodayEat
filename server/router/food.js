const express = require("express");
const app = express();
const router = express.Router();

const foodService = require("../services/food");

router.get("/", async (req, res) => {
  //const state = ;

  const result = await foodService.getFood;

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

module.exports = router;
