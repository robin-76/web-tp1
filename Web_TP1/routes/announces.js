const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');
const auth = require('./auth');
 
// Get a specific announce
router.get('/:formId', async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        announcer = req.session.announcer;
        res.render('announceId', { title:'Announce', announceId, announcer });
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
router.post('/:formId/modify', auth, async(req, res) => {
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
        res.render('modify');
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;