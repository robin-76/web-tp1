const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const Announce = mongoose.model('Announce');
const auth = require('./auth');
const upload = require('./upload');

// Get form
router.get('/', auth, (req, res) => {
    const auth = req.session.isAuth;
    const name = req.session.name;
    const announcer = req.session.announcer;
    const url = "/";
    const page = "form";
    res.render('form', { title: 'Form', auth, name, announcer, url, page });
});

// Create form (create an announce)
router.post('/', async(req, res) => {
    try {
        const errors = validationResult(req);
        await upload(req, res);

        if (errors.isEmpty()) {
        const filenames = req.files.map(function(file) {
          return file.filename;
        });
        req.body.author = req.session.name;
        req.body.photos = filenames;
        const announce = new Announce(req.body);
        announce.save()
            .then(() => { res.redirect('/validation'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });

          } else {
            res.render('form', {
                title: 'Announce form',
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
