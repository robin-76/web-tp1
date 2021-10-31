const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');
const auth = require('./auth');

router.get('/', (req, res) => {
    const announcer = req.session.announcer;
    const auth = req.session.isAuth;
    const url = "/";
    const page = "announces";
    Announce.find()
        .then((announces) => {
          res.render('announces', { title: 'Announces', announces, announcer, auth, url, page });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

// Get a specific announce
router.get('/:formId', async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        const auth = req.session.isAuth;
        const announcer = req.session.announcer;
        const url = "../";
        const page = "announceId";
        res.render('announceId', { title:'Announce', announceId, announcer, auth, url, page });
    } catch(err) {
        res.json({ message : err });
    }
});

router.get('/modify/:formId/', auth, async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        const auth = req.session.isAuth;
        const announcer = req.session.announcer;
        const url = "../../";
        const page = "modify";
    res.render('modify', { title: 'Modify', announceId, auth, announcer, url, page });
    } catch(err) {
        res.json({ message : err });
    }
});

// Delete a specific announce
router.post('/:formId', auth, async(req, res) => {
    try {
        await Announce.deleteOne({_id: req.params.formId})
        res.redirect('/announces');
    } catch (err) {
        res.json({message: err});
    }
});

// Update a specific announce
router.post('/modify/:formId/', auth, async(req, res) => {
    try {
        await Announce.updateOne({_id: req.params.formId},{$set:
                {
                    title: req.body.title,
                    description: req.body.description,
                    publicationStatus: req.body.publicationStatus,
                    goodStatus: req.body.goodStatus,
                    type: req.body.type,
                    price: req.body.price,
                    firstDate: req.body.firstDate,
                    secondDate: req.body.secondDate
                }}
        );
        res.redirect('/announces');
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;