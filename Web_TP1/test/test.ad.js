require('dotenv').config();
require('../models/Ad');
const assert = require('assert');

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');
const Comment = mongoose.model('Comment');

describe('Ad', function() {
    before(function(done) {
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection
            .on('open', () => {
                console.log('Mongoose connection open');
            })
            .on('error', (err) => {
                console.log(`Connection error: ${err.message}`);
            });
            done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        const ad = new Ad({
            author: 'bob',
            title: 'Appartement à louer en centre-ville',
            type: 'Location',
            publicationStatus: 'Published',
            goodStatus: 'Available',
            description: 'Magnifique appartement de 50 m² à louer',
            price: '800',
            photos: ['test_ad1.jpeg', 'test_ad2.jpeg']
        });

        ad.save()
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });

        const ad2 = new Ad({
                author: 'jerry',
                title: 'Maison à vendre en campagne',
                type: 'Sell',
                publicationStatus: 'Published',
                goodStatus: 'Available',
                description: 'Maison de 200 m² à vendre',
                price: '150000'
        });

        ad2.save()
            .then(() => { done(); })
            .catch((err) => {
                console.log(err);
            });

        const comment = Comment.create({
            author: 'alice',
            text: 'Bonjour, en quelle année la maison a été construite ?',
            agent: false,
            ad: ad._id
        })

        const comment2 = Comment.create({
            author: 'robert',
            text: 'Bonjour alice, \nla maison fut construite en 1998. \n\nCordialement, \nRobert',
            agent: true,
            ad: ad._id
        })

        Ad.updateOne({_id: ad._id},{$set: {
                comments: comment, comment2
            }}
        );

    });

    it('Author of the ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.author, 'bob');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Type of ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.type, 'Location');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Publication status of ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.publicationStatus, 'Published');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Status of the ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.goodStatus, 'Available');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Description of the ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.description, 'Magnifique appartement de 50 m² à louer');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Price of the ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
        .then((ads) => {
            assert.equal(ads.price, '800');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Author\'s ads', function(done) {
        Ad.find({ author: 'bob' })
        .then((ads) => {
            assert.equal(ads[0].title, 'Appartement à louer en centre-ville');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Photo(s) of the ad', function(done) {
        Ad.findOne({ title: 'Appartement à louer en centre-ville' })
            .then((ads) => {
                assert.equal(ads.photos[0], 'test_ad1.jpeg');
                assert.equal(ads.photos[1], 'test_ad2.jpeg');
                done();
            })
            .catch((err) => { console.log(err); });
    });

    it('Comment viewer', function(done) {
        Comment.find( {author: 'alice'})
        .then((comments) => {
            assert.equal(comments[0].text, 'Bonjour, en quelle année la maison a été construite ?');
            assert.equal(comments[0].author, 'alice');
            assert.equal(comments[0].agent, false);
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('Comment agent', function(done) {
        Comment.find( {author: 'robert'})
            .then((comments) => {
                assert.equal(comments[0].text, 'Bonjour alice, \nla maison fut construite en 1998. \n\nCordialement, \nRobert');
                assert.equal(comments[0].author, 'robert');
                assert.equal(comments[0].agent, true);
                done();
            })
            .catch((err) => { console.log(err); });
    });

    afterEach(function(done) {
        Comment.deleteMany({}, function () {
            done();
        });
    });

    afterEach(function(done) {
        Ad.deleteMany({}, function () {
            done();
        })
     });
});
