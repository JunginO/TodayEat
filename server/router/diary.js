const express = require("express");
const app = express();
const router = express.Router();

const diaryService = require("../services/diary");

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  const result = await diaryService.getDiary(userId);

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const result = await diaryService.deleteDiary(id);
  if (result) {
    return res.status(200).send({
      sucess: true,
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
/*
router.post("/", async (req, res) => {
  const { category_id, title, content, is_secret } = req.body;

  const result = await boardService.createBoard(
    category_id,
    req.user.id,
    title,
    content,
    is_secret
  );

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
//asdasdasdasd
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await diaryService.getDiary(userId);

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
});*/

router.post("/post/:id", async (req, res) => {
  const userId = req.params.id;
  const { title, content } = req.body;
  console.log(userId);
  const result = await diaryService.createDiary(userId, title, content);

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
