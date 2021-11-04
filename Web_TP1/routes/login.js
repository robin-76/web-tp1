const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Get the login form to log
router.get('/', (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  const auth = req.session.isAuth;
  const name = req.session.name;
  const announcer = req.session.announcer;
  const url = "/";
  const page = "login"

  if(auth)
    res.redirect("/");
  res.render("login", { err: error, auth, name, announcer, url, page });
});

// Log in the website
router.post('/', async(req, res) => {
    // Checking if the name exists
    const user = await User.findOne({name: req.body.name});

    if(!user) {
        req.session.error = "User is not found";
        return res.redirect("/login");
    } 

    // Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
          req.session.error = "Invalid password";
          return res.redirect("/login");
    }

    req.session.announcer = !!user.announcer;

    req.session.name = user.name;  
    req.session.isAuth = true;
    res.redirect('/');
}); 

// Log out from the website
router.post('/logout', async(req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
      });
}); 

module.exports = router;