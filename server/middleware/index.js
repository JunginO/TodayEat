exports.isLoggendIn = (req, res, next) => {
    if (req.inAuthenticated()){
        next(); // 인증된 사람인가?
    } else {
        res.status(403).send("로그인 필요");
    }
};

exports.inNotLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        next();
    } else {
        res.redirect("/");
    }
};