const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announce = mongoose.model('Announce');

// Get a specific announce
router.get('/:formId', async(req, res) => {
    try {
        const announceId = await Announce.findById(req.params.formId);
        res.render('announceId', { title:'Announce', announceId });
    } catch(err) {
        res.json({ message : err });
    }
});

// Delete a specific announce
router.post('/:formId', async(req, res) => {
    try {
        await Announce.deleteOne({_id: req.params.formId })
        res.render('validation', {title: 'Announce deleted'});
    } catch(err) {
        res.json({ message : err });
    }
});

// Update a specific announce
router.post('/:formId', async(req, res) => {
    try {
        const updatedAnnounce = await Announce.updateOne(
            {_id: req.params.formId},
            {$set: {title: req.body.title}}
        );
        res.json(updatedAnnounce);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;