const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');

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
    if(!validPass) return res.status(400).send('Invalid password')

    res.send('Logged in !');
}); 

module.exports = router;