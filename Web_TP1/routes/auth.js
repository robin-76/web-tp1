module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
      req.session.error = "You have to Login first";
      res.redirect("/login");
    } 
    else if(!req.session.announcer){
      res.redirect("/");
    }

    else if(req.session.announcer){
      next();
    }
  };
  