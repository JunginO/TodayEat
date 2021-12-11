const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const dbconfig = require("./config/database");

const router = require("./router/index");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

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
  saveUninitialized: true,
  store: new MySQLStore(dbconfig.connection),
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

router.use("/api", router);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });
app.use(router);
