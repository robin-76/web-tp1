const express = require('express');
const router = express.Router();

// Validation page route.
router.get('/', function(req, res) {
    res.render('validation', { title: 'Success' });
});

module.exports = router;