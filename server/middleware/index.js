exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 인증된 사람인가?
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
