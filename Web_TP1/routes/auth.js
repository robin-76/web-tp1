module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
      req.session.error = "You have to Login first";
      res.redirect("/login");
    } 
    else if(!req.session.announcer){
      console.log(req.session.announcer);
      console.log("Vous n'êtes pas annonceur");
    }

    else if(req.session.announcer){
      next();
    }
  };
  