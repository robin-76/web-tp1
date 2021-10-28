const express = require('express');
const router = express.Router();

/* Form's validation in case of success */
router.get('/', function(req, res) {
    res.render('validation', { title: 'Validation' });
});

module.exports = router;
