const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    album_id: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
    title: { type: String, required: true},
    review_text: { type: String, required: true },
    rating: { type: Number, required: true},
    picture: { type: String},
    upvotes: { type: Number, required: true},
    downvotes: { type: Number, required: true},
    reply_text: { type: String},
    date: { type: Date, default: Date.now }
},);
  
module.exports = mongoose.model('Review', reviewSchema)