const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');
const Session = require('../models/Session');

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/', async(req, res) => {
    const errors = validationResult(req);

    // Checking if the email exists
    const user = await User.findOne({name: req.body.name});
    if(!user) return res.status(400).send('User is not found');

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  //  res.header('auth-token', token).send(token);
   console.log(token);
   

    const session = new Session({
        token: token
    });

    try {
        const savedSession = await session.save();
        res.json(savedSession);
    } catch(err) {
        res.json({ message : err });
    }

}); 

module.exports = router;