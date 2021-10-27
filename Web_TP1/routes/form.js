const express = require('express');
const router = express.Router();

// Formulaire pour ajouter une annonce.
router.get('/', function(req, res) {
    res.render('form', { title: 'TP1' });
});

module.exports = router;
