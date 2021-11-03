const mongoose = require("mongoose");

const AnnounceSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    publicationStatus: {
        type: String,
        required: true
    },
    goodStatus: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    firstDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    secondDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    photos: {
        type: [String]
    },
    comments: {
        type: [String]
    }
})

module.exports = mongoose.model('Announce', AnnounceSchema);