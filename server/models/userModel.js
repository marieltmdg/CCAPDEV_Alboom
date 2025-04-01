const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    country: { type: String, default: "Unknown" },
    link: { type: String, default: "Unknown" },
    hash: { type: String },
    salt: { type: String },
});

module.exports = mongoose.model('User', userSchema);