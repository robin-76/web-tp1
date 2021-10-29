const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

/*router.post('/', (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const user = new User(req.body);
        user.save()
            .then(() => { res.redirect('/validation'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
        res.render('login', {
            title: 'login form',
            errors: errors.array(),
            data: req.body,
        });
    }
}); */

module.exports = router;