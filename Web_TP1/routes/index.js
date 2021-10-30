const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/announces', (req, res) => {
  announcer = req.session.announcer;
  console.log(announcer);
  Announce.find()
      .then((announces) => {
        res.render('announces', { title: 'Announces', announces, announcer });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;
