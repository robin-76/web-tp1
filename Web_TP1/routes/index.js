const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TP1' });
});

router.get('/announces', (req, res) => {
  Announce.find()
      .then((announces) => {
        res.render('announces', { title: 'TP1', announces });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;
