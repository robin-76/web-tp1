const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');


router.get('/', (req, res) => {
    res.render('signup', { title: 'Sign up' });
});

router.post('/', async(req, res) => {
    const errors = validationResult(req);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists')

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

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