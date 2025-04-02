const asyncHandler = require("express-async-handler")

const Review = require("../models/reviewModel.js")
const VoteTransaction = require("../models/voteTransactionModel.js")
const path = require("path")
const fs = require("fs")

module.exports = {
    create: asyncHandler(async (req, res) => {
        const { user_id, album_id, title, review_text, rating } = req.body;
        let picture = null;

        if (req.files && req.files.picture) {
            const photo = req.files.picture;
            const uploadPath = "uploads/"+ user_id.toString();

            fs.mkdirSync(uploadPath, { recursive: true });
            
            const photoPath = path.join(uploadPath, `${Date.now()}-${photo.name}`);
            await photo.mv(photoPath);
            picture = photoPath;
        }

        try {
            const review = new Review({
                title,
                review_text,
                rating,
                user_id,
                album_id,
                picture,
                upvotes: 0,
                downvotes: 0
            });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    read: asyncHandler(async (req, res) => {
        const reviews = await Review.find({})
            .populate("user_id")
            .populate("album_id")

        res.json(reviews)
    }),

    readID: asyncHandler(async (req, res) => {
        const review = await Review.findById(req.params.id)
            .populate("user_id")
            .populate("album_id")

        res.json(review)
    }),
        

    readUserID: asyncHandler(async (req, res) => {
        const reviews = await Review.find({ user_id: req.params.id })
            .populate("user_id")
            .populate("album_id")

        res.json(reviews)    
    }),

    readAlbumID: asyncHandler(async (req, res) => {
        const reviews = await Review.find({ album_id: req.params.id })
            .populate("user_id")
            .populate("album_id")

        res.json(reviews)    
    }),

    readUserAlbumID: asyncHandler(async (req, res) => {
        const { userId, albumId } = req.params;
        const reviews = await Review.find({ user_id: userId, album_id: albumId });
        res.status(200).json(reviews);
    }),

    update: asyncHandler(async (req, res) => {
        const review = await Review.findById(req.params.id)
            .populate("user_id")
            .populate("album_id")
        
        const { user_id, album_id, title, review_text, rating } = req.body;
        let picture = null;

        if (req.files && req.files.picture) {
            const photo = req.files.picture;
            const uploadPath = "uploads/"+ user_id.toString();

            fs.mkdirSync(uploadPath, { recursive: true });
            
            const photoPath = path.join(uploadPath, `${Date.now()}-${photo.name}`);
            await photo.mv(photoPath);
            picture = photoPath;
        }

        review.title = title
        review.review_text = review_text
        review.rating = rating
        review.picture = picture
        review.isEdited = true
        
        review.save();
        res.json(review);
    }),

    updateReply: asyncHandler(async (req, res) => {
        const review = await Review.findById(req.params.id)
        review.reply_text = req.body.replyText
        await review.save()
        res.json(review)
    }),

    upvote: async (req, res) => {
        try {
            const { reviewID } = req.params;
            const { userID } = req.body;
            const existingVote = await VoteTransaction.findOne({ review_id: reviewID, user_id: userID });

            if (existingVote) {
                if (existingVote.voteType === "upvote") {
                    return res.status(400).json({ message: "User has already upvoted" });
                } else {
                    existingVote.voteType = "upvote";
                    await existingVote.save();
                    await Review.findByIdAndUpdate(reviewID, { $inc: { upvotes: 1, downvotes: -1 } });
                    return res.status(200).json({ message: "Vote changed to upvote" });
                }
            }

            await VoteTransaction.create({ review_id: reviewID, user_id: userID, voteType: "upvote" });
            await Review.findByIdAndUpdate(reviewID, { $inc: { upvotes: 1 } });

            res.status(200).json({ message: "Upvoted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error upvoting review" });
        }
    },

    downvote: async (req, res) => {
        try {
            const { reviewID } = req.params;
            const { userID } = req.body;
            const existingVote = await VoteTransaction.findOne({ review_id: reviewID, user_id: userID });

            if (existingVote) {
                if (existingVote.voteType === "downvote") {
                    return res.status(400).json({ message: "User has already downvoted" });
                } else {
                    existingVote.voteType = "downvote";
                    await existingVote.save();
                    await Review.findByIdAndUpdate(reviewID, { $inc: { upvotes: -1, downvotes: 1 } });
                    return res.status(200).json({ message: "Vote changed to downvote" });
                }
            }

            await VoteTransaction.create({ review_id: reviewID, user_id: userID, voteType: "downvote" });
            await Review.findByIdAndUpdate(reviewID, { $inc: { downvotes: 1 } });

            res.status(200).json({ message: "Downvoted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error downvoting review" });
        }
    },

    checkVoteStatus: async (req, res) => {
        try {
            const { reviewID, userID } = req.params;
            const existingVote = await VoteTransaction.findOne({ review_id: reviewID, user_id: userID });

            res.status(200).json({ hasVoted: !!existingVote, voteType: existingVote ? existingVote.voteType : null });
        } catch (error) {
            res.status(500).json({ error: "Error checking vote status" });
        }
    },

    delete: asyncHandler(async (req, res) => {
        const { id } = req.params

        await Review.findByIdAndDelete(id);

        res.json({})
    }),
}