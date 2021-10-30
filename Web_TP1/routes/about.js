const express = require('express');
const router = express.Router();

// About page route.
router.get('/', function(req, res) {
    announcer = req.session.announcer;
    console.log(announcer);
    res.render('about', { title: 'About' });
});

module.exports = router;