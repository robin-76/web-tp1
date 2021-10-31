const express = require('express');
const router = express.Router();

// About page route.
router.get('/', function(req, res) {
    const auth = req.session.isAuth;
    const url = "/";
    const page = "about";
    res.render('about', { title: 'About', auth, url, page });
});

module.exports = router;