const express = require('express');
const router = express.Router();

/* Validation du formulaire */
router.get('/', function(req, res) {
    res.render('validation', { title: 'Validation' });
});

module.exports = router;
