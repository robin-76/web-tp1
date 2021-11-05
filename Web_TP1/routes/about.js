const express = require('express');
const router = express.Router();

// About page route.
router.get('/', function(req, res) {
    const auth = req.session.isAuth;
    const username = req.session.username;
    const agent =req.session.agent;
    const url = "/";
    const page = "about";
    res.render('about', { title: 'About', auth, username, agent, url, page });
});

module.exports = router;
