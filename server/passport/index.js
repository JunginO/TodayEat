const passport = require("passport"); //passport불러오기

const { User } = require("../models/index");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
};
