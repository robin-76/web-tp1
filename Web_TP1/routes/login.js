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
  const username = req.session.username;
  const agent = req.session.agent;
  const url = "/";
  const page = "login"

  if(auth)
    res.redirect("/");
  res.render("login", { err: error, auth, username, agent, url, page });
});

// Log in the website
router.post('/', async(req, res) => {
    // Checking if the username exists
    const user = await User.findOne({username: req.body.username});

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
    
    // Expires after 1 hour
    req.session.cookie.expires = new Date(Date.now() + 3600000);

    req.session.agent = !!user.agent;
    req.session.username = user.username;  
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