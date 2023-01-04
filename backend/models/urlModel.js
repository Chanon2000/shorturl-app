const mongoose = require('mongoose');
const validator = require('validator');


const urlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        unique: true,
        required: [true, 'A url must have a urlId'],
    },
    originalUrl: {
        type: String,
        required: [true, 'A url must have a originalUrl'],
    },
    shortUrl: {
        type: String,
        required: [true, 'A url must have a shortUrl'],
    },
    createAt: {
        type: String,
        default: Date.now(),
    },
})


const Url = mongoose.model('Url', urlSchema);
module.exports = Url;