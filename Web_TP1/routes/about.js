const express = require('express');
const router = express.Router();

// About page route.
router.get('/', function(req, res) {
    const auth = req.session.isAuth;
    const name = req.session.name;
    const announcer =req.session.announcer;
    const url = "/";
    const page = "about";
    res.render('about', { title: 'About', auth, name, announcer, url, page });
});

module.exports = router;