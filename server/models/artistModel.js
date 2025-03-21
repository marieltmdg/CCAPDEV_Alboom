const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    artistname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    picture: { type: String },
    bio: { type: String },
    country: { type: String, default: "Unknown" },
    link: { type: String, default: "Unknown" },
});

module.exports = mongoose.model('Artist', artistSchema)