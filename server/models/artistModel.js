const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    location: { type: String },
    link: { type: String }
});

module.exports = mongoose.model('Artist', artistSchema)