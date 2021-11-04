const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');

// Get signup form to create an account
router.get('/', (req, res) => {
  const error = req.session.error;
  const auth = req.session.isAuth;
  const name = req.session.name;
  const announcer = req.session.announcer;
  const url = "/";
  const page = "signup";
  delete req.session.error;

  if(auth)
    res.redirect("/");
    
  res.render("signup", { err: error, auth, name, announcer, url, page });
});

// Create the account
router.post('/', async(req, res) => {
    const errors = validationResult(req);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) {
      req.session.error = "User already exists";
      return res.redirect("/signup");
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    if (errors.isEmpty()) {
        const user = new User(req.body);
        user.save()
            .then(() => { res.redirect('/validation'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
        res.render('signup', {
            title: 'Sign up form',
            errors: errors.array(),
            data: req.body,
        });
    }
});

module.exports = router;