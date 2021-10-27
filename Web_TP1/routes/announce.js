const express = require('express');
const router = express.Router();
const Announce = require('../models/Announce');

// Get back all the announces
router.get('/', async function(req, res) {
    console.log(req.body);
    try {
        const announces = await Announce.find();
        res.json(announces);
    } catch(err) {
        res.json({ message : err });
    }
});

// Post an announce
router.post('/', async(req, res) => {
    res.redirect('/validation');
    const announce = new Announce({
        title: req.body.title,
        type: req.body.type,
        publicationStatus: req.body.publicationStatus,
        goodStatus: req.body.goodStatus,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const savedAnnounce = await announce.save();
        res.json(savedAnnounce);
    } catch(err) {
        res.json({ message : err });
    }
});

// Get a specific announce
router.get('/:formId', async(req, res) => {
    try {
        const announce = await Announce.findById(req.params.formId);
        res.json(announce);
    } catch(err) {
        res.json({ message : err });
    }
});

// Delete a specific announce
router.delete('/:formId', async(req, res) => {
    try {
        const removedAnnounce = await Announce.remove({_id: req.params.formId })
        res.json(removedAnnounce);
    } catch(err) {
        res.json({ message : err });
    }
});

// Update a specific announce
router.patch('/:formId', async(req, res) => {
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