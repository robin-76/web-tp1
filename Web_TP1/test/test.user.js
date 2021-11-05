require('dotenv').config();
require('../models/User');
const assert = require('assert');

const mongoose = require('mongoose');
const User = mongoose.model('User');

describe('User', function() {
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
        const user = new User({
            username: 'bob',
            email: 'bob_76@gmail.com',
            password: 'pass',
            agent: true
        });

        user.save()
            .then(() => { done(); })
            .catch((err) => {
                console.log(err);
            });
    });

    it('Find an email by username', function(done) {
        User.findOne({ username : 'bob'})
        .then((users) => {
            assert.equal(users.email, 'bob_76@gmail.com');
            done();
        })
        .catch((err) => { console.log(err); });
        });

    it('User is a real state agent', function(done) {
        User.findOne({ username : 'bob'})
        .then((users) => {
            assert.equal(users.agent, true);
            done();
        })
        .catch((err) => { console.log(err); });
        });

    afterEach(function(done) {
        User.deleteMany({}, function() {
            done();
        });
     });

});