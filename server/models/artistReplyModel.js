const mongoose = require("mongoose");

const artistReplySchema = new mongoose.Schema({
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
    artist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    reply_text: { type: String, required: true }
}, { _id: false });

module.exports = mongoose.model('ArtistReply', artistReplySchema)