const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const router = express.Router();
const Announce = mongoose.model('Announce');
const auth = require('./auth');
const upload = require('./upload');

router.get('/', auth, (req, res) => {
    const auth = req.session.isAuth;
    const announcer = req.session.announcer;
    const url = "/";
    const page = "form";
    res.render('form', { title: 'Form', auth, announcer, url, page });
});

router.post('/', upload, async(req, res) => {
    const errors = validationResult(req);

    try {
        if (errors.isEmpty()) {
            const filenames = req.files.map(function(file) {
                return file.filename;
              });
            req.body.pictures = filenames;
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
        
        await upload(req, res);
           
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }
});

module.exports = router;