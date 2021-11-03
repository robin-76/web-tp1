const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');
const auth = require('./auth');
const upload = require('./upload');
const fs = require('fs');

// Get the announces
router.get('/', (req, res) => {
    const announcer = req.session.announcer;
    const name = req.session.name;
    const auth = req.session.isAuth;
    const url = "/";
    const page = "announces";
    Announce.find()
        .then((announces) => {
          res.render('announces', { title: 'Announces', announces, announcer, auth, name, url, page });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

// Get a specific announce
router.get('/:formId', async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        const auth = req.session.isAuth;
        const name = req.session.name;
        const announcer = req.session.announcer;
        const url = "../";
        const page = "announceId";
        res.render('announceId', { title:'Announce', announceId, announcer, auth, name, url, page });
    } catch(err) {
        res.json({ message : err });
    }
});

// Get a modify form
router.get('/modify/:formId/', auth, async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        const auth = req.session.isAuth;
        const name = req.session.name;
        const announcer = req.session.announcer;
        const url = "../../";
        const page = "modify";
        const fDate = announceId.firstDate.toISOString().split('T')[0];
        const sDate = announceId.secondDate.toISOString().split('T')[0];
        res.render('modify', { title: 'Modify', announceId, auth, name, announcer, url, page, fDate, sDate });
    } catch(err) {
        res.json({ message : err });
    }
});

// Delete a specific announce
router.post('/:formId', auth, async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        const oldPicture = announceId.photos;
        
        await Announce.deleteOne({_id: req.params.formId})
        
        // Deleting images
        for (let i = 0; i < oldPicture.length; i++) {
            fs.unlink(`public/images/${oldPicture[i]}`,(err) => {
                if (err) throw err;
             });
          }
        res.redirect('/announces');
    } catch (err) {
        res.json({message: err});
    }
});

// Update a specific announce
router.post('/modify/:formId/', auth, async(req, res) => {
    try {
        await upload(req, res);
        const announceId = await Announce.findById(req.params.formId);
        const oldPicture = announceId.photos;
        let filenames;
            
        if(req.files.length){
            filenames = req.files.map(function(file) { return file.filename; });
        
            // Deleting images    
            for (let i = 0; i < oldPicture.length; i++) {
                fs.unlink(`public/images/${oldPicture[i]}`,(err) => {
                    if (err) throw err;
                });
             }
        }
        else
            filenames = oldPicture;
                  
        await Announce.updateOne({_id: req.params.formId},{$set:
            {
                title: req.body.title,
                description: req.body.description,
                publicationStatus: req.body.publicationStatus,
                goodStatus: req.body.goodStatus,
                type: req.body.type,
                price: req.body.price,
                firstDate: req.body.firstDate,
                secondDate: req.body.secondDate,
                photos: filenames
            }}
        );
        
        res.redirect('/announces');

    } catch (error) {
        res.json({message: err});
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }
});

module.exports = router;