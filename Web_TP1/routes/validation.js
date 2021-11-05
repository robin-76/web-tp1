const express = require('express');
const router = express.Router();

// Validation page route.
router.get('/', function(req, res) {
    const auth = req.session.isAuth;
    const username = req.session.username;
    const agent = req.session.agent;
    const url = "/";
    const page = "validation";
    res.render('validation', { title: 'Success', auth, username, agent, url, page });
});

module.exports = router;