const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    country: { type: String },
    link: { type: String },
    latest_review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" }
});

module.exports = mongoose.model('User', userSchema);