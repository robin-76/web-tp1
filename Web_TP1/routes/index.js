const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');

/* GET home page. */
router.get('/', function(req, res) {
  const auth = req.session.isAuth;
  const name = req.session.name;
  const url = "/";
  const page = "index";
  res.render('index', { title: 'Home', auth, name, url, page });
});

router.get('/announces', (req, res) => {
  announcer = req.session.announcer;
  const auth = req.session.isAuth;
  const url = "/";
  const page = "announces";
  Announce.find()
      .then((announces) => {
        res.render('announces', { title: 'Announces', announces, announcer, auth, url, page });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;
