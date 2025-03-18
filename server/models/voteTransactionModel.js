const mongoose = require("mongoose");

const voteTransactionSchema = new mongoose.Schema({
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
});

voteTransactionSchema.index({ review_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("VoteTransaction", voteTransactionSchema);