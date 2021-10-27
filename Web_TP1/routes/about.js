const express = require('express');
const router = express.Router();

// About page route.
router.get('/', function(req, res) {
    res.render('about', { title: 'TP1' });
});

module.exports = router;