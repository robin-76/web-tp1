const express = require('express');
const router = express.Router();

/* Get home page. */
router.get('/', function(req, res) {
  const auth = req.session.isAuth;
  const name = req.session.name;
  const agent =req.session.agent;
  const url = "/";
  const page = "index";
  res.render('index', { title: 'Home', auth, name, agent, url, page });
});

module.exports = router;
