const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Sessions', SessionSchema);
