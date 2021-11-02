const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  const auth = req.session.isAuth;
  const name = req.session.name;
  const announcer =req.session.announcer;
  const url = "/";
  const page = "index";
  res.render('index', { title: 'Home', auth, name, announcer, url, page });
});

module.exports = router;
