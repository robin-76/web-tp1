module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
      req.session.error = "You have to Login first";
      res.redirect("/login");
    } 
    else if(!req.session.agent){
      res.redirect("/");
    }

    else if(req.session.agent){
      next();
    }
  };
  