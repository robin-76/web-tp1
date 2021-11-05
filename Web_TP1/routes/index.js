const express = require('express');
const router = express.Router();

/* Get home page. */
router.get('/', function(req, res) {
  const auth = req.session.isAuth;
  const username = req.session.username;
  const agent =req.session.agent;
  const url = "/";
  const page = "index";
  res.render('index', { title: 'Home', auth, username, agent, url, page });
});

module.exports = router;
