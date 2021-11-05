const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const Ad = mongoose.model('Ad');
const auth = require('./auth');
const upload = require('./upload');

// Get form
router.get('/', auth, (req, res) => {
    const auth = req.session.isAuth;
    const username = req.session.username;
    const agent = req.session.agent;
    const url = "/";
    const page = "form";
    res.render('form', { title: 'Form', auth, username, agent, url, page });
});

// Create form (create an ad)
router.post('/', async(req, res) => {
    try {
        const errors = validationResult(req);
        await upload(req, res);

        if (errors.isEmpty()) {
        const filenames = req.files.map(function(file) {
          return file.filename;
        });
        req.body.author = req.session.username;
        req.body.photos = filenames;
        const ad = new Ad(req.body);
        ad.save()
            .then(() => { res.redirect('/validation'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });

          } else {
            res.render('form', {
                title: 'Ad form',
                errors: errors.array(),
                data: req.body,
            }); 
          }     
     
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }
});

module.exports = router;
