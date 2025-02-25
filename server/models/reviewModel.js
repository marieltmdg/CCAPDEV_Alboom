const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    album_id: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
    review_text: { type: String, required: true }
});
  
module.exports = mongoose.model('Review', reviewSchema)