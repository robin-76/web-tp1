const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');
const Comment = mongoose.model('Comment');
const auth = require('./auth');
const upload = require('./upload');
const fs = require('fs');

// Get all the ads
router.get('/', (req, res) => {
    const agent = req.session.agent;
    const username = req.session.username;
    const auth = req.session.isAuth;
    const url = "/";
    const page = "ads";
    Ad.find()
        .then((ads) => {
            res.render('ads', { title: 'Ads', ads, agent, auth, username, url, page });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});

// Get a specific ad
router.get('/:id', async(req, res) => {
    try {
        const adId = await Ad.findById(req.params.id).populate('comments');
        const commentId = await Comment.find({ ad: adId._id});
        const auth = req.session.isAuth;
        const username = req.session.username;
        const agent = req.session.agent;
        const url = "../";
        const page = "adId";
        res.render('adId', { title:'Ad', adId, commentId, agent, auth, username, url, page });
    } catch(err) {
        res.json({ message : err });
    }
});

// Get a modify form
router.get('/modify/:id/', auth, async(req, res) => {
    try {
        const adId = await Ad.findById(req.params.id);
        const auth = req.session.isAuth;
        const username = req.session.username;
        const agent = req.session.agent;
        const url = "../../";
        const page = "modify";
        const fDate = adId.firstDate.toISOString().split('T')[0];
        const sDate = adId.secondDate.toISOString().split('T')[0];
        res.render('modify', { title: 'Modify', adId, auth, username, agent, url, page, fDate, sDate });
    } catch(err) {
        res.json({ message : err });
    }
});

// Delete a specific ad
router.post('/delete/:id', auth, async(req, res) => {
    try {
        const adId = await Ad.findById(req.params.id).populate('comments');
        const oldPicture = adId.photos;

        await Ad.deleteOne({_id: req.params.id});
        await Comment.deleteMany({ ad: req.params.id });

        // Deleting images
        for (let i = 0; i < oldPicture.length; i++) {
            fs.unlink(`public/images/${oldPicture[i]}`,(err) => {
                if (err) throw err;
            });
        }
        res.redirect('/ads');
    } catch (err) {
        res.json({message: err});
    }
});

// Update a specific ad
router.post('/modify/:id/', auth, async(req, res) => {
    try {
        await upload(req, res);
        const adId = await Ad.findById(req.params.id);
        const oldPicture = adId.photos;
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

        await Ad.updateOne({_id: req.params.id},{$set:
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

        res.redirect(`/ads/${adId._id}`);

    } catch (error) {
        res.json({message: err});
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
});

// Post a comment
router.post('/comment/:id', async(req, res) => {
    try {
        const adId = await Ad.findById(req.params.id).populate('comments');
        let tabComments = adId.comments;

        const comment = await Comment.create({
            author: req.session.username,
            text: req.body.comment,
            agent: req.session.agent,
            ad: adId._id
        })

        tabComments.push(comment);

        await Ad.updateOne({_id: req.params.id},{$set: {
                comments: tabComments
            }}
        );
        res.redirect(`/ads/${adId._id}`);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;