const express = require('express');
const router = express.Router();

/* Form's validation in case of success */
router.get('/', function(req, res) {
    res.render('validationsignup', { title: 'Validation Sign up' });
});

module.exports = router;
