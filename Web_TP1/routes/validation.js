const express = require('express');
const router = express.Router();

/* Form validation in case of success */
router.get('/', function(req, res) {
    res.render('validation', { title: 'TP1' });
});

module.exports = router;
