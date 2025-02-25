const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true }
});

module.exports = mongoose.model('Album', albumSchema)