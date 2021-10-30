const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login", { err: error });
});

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

    if(user.announcer)
      req.session.announcer = true;
    else 
      req.session.announcer = false;  

    req.session.isAuth = true;
    res.redirect('/');
}); 

router.post('/logout', async(req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
      });
}); 

module.exports = router;