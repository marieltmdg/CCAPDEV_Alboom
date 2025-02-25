const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    location: { type: String },
    link: { type: String },
    latest_review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" }
});
  
module.exports = mongoose.model('User', userSchema)