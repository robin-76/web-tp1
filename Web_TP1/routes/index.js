const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  const auth = req.session.isAuth;
  const announcer =req.session.announcer;
  const name = req.session.name;
  const url = "/";
  const page = "index";
  res.render('index', { title: 'Home', auth, announcer, name, url, page });
});

module.exports = router;
