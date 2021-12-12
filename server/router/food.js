const express = require("express");
const app = express();
const router = express.Router();

const foodService = require("../services/food");

router.get("/random/:id", async (req, res) => {
  const WCode = req.params.id;

  const result = await foodService.getFood(WCode);
  console.log(result);
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
router.get("/select/:category", async (req, res) => {
  const category = req.params.category;

  const result = await foodService.getSelectedFood(category);
  console.log(result);
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
router.post("/add/:food", async (req, res) => {
  const food = req.params.food;
  const { content } = req.body;
  const result = await foodService.createNewFood(food, content);

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
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
