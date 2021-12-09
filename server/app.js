const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const models = require("./models/index.js");
const router = require("./router/index");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.listen(port, () => {
  console.log("server on " + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionOption = {
  secret: "capstone-secret",
  name: "sessionId",
  resave: false,
    rolling:true,
    secure: true,
    httpOnly:true,
}

models.sequelize.sync().then( () => {
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})



app.use(router);
router.use("/api", router);
