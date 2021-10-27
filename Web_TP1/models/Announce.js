const mongoose = require("mongoose");

const AnnounceSchema = mongoose.Schema({
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
    photo: {
        data: Buffer,
        contentType: String,
    }
})

module.exports = mongoose.model('Announces', AnnounceSchema);