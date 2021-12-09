const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);
const passportConfig = require("./passport");

app.use(cors(corsOptions));
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const { sequelize } = require("./models");
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
  secret: "todayeat-secret",
  name: "sessionId",
  resave: false,
  rolling: true,
  secure: true,
  httpOnly: true,
};
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

app.use(router);
router.use("/api", router);
