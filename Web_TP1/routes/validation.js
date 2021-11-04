const express = require('express');
const router = express.Router();

// Validation page route.
router.get('/', function(req, res) {
    const auth = req.session.isAuth;
    const name = req.session.name;
    const agent = req.session.agent;
    const url = "/";
    const page = "validation";
    res.render('validation', { title: 'Success', auth, name, agent, url, page });
});

module.exports = router;