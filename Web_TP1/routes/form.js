const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const Announce = mongoose.model('Announce');
const auth = require('./auth');

router.get('/', auth, (req, res) => {
    const auth = req.session.isAuth;
    const url = "/";
    const page = "form";
    res.render('form', { title: 'Form', auth, url, page });
});

router.post('/', (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const announce = new Announce(req.body);
        announce.save()
            .then(() => { res.redirect('/validation'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
        res.render('form', {
            title: 'Announce form',
            errors: errors.array(),
            data: req.body,
        });
    }
});

module.exports = router;