const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const Announce = mongoose.model('Announce');

router.get('/', (req, res) => {
    res.render('form', { title: 'TP1' });
});

router.post('/', (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const announce = new Announce(req.body);
        announce.save()
            .then(() => { res.render('validation', {title: 'TP1'}); })
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