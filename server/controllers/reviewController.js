const asyncHandler = require("express-async-handler")

const reviewModel = require("../models/reviewModel.js")

module.exports = {
    create: asyncHandler(async (req, res) => {
        const { user_id, album_id, title, review_text, rating } = req.body;

        try {
            const review = reviewModel.create({
                title: title,
                review_text: review_text,
                rating: rating,
                user_id: user_id,
                album_id: album_id,
                upvotes: 0,
                downvotes: 0
            })
            res.status(201).json(review);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    read: asyncHandler(async (req, res) => {
        const reviews = await reviewModel.find({})
            .populate("user_id")
            .populate("review_id")

        res.json(reviews)
    }),

    readUserID: asyncHandler(async (req, res) => {
        const reviews = await reviewModel.find({ user_id: req.params.id })
            .populate("user_id")
            .populate("album_id")

        res.json(reviews)    
    }),

    readAlbumID: asyncHandler(async (req, res) => {
        const reviews = await reviewModel.find({ album_id: req.params.id })
            .populate("user_id")
            .populate("album_id")

        res.json(reviews)    
    }),

    update: asyncHandler(async (req, res) => {
        const { userID, albumID } = req.params

        // Update API Endpoint
    }),

    upvote: asyncHandler(async (req, res) => {
        const review = await reviewModel.findById(req.params.reviewID)
        review.upvotes += 1
        await review.save()
        res.json(review)
    }),

    downvote: asyncHandler(async (req, res) => {
        const review = await reviewModel.findById(req.params.reviewID)
        review.downvotes += 1
        await review.save()
        res.json(review)
    }),

    delete: asyncHandler(async (req, res) => {
        const { userID, albumID } = req.params

        await reviewModel.findOneAndDelete({ user_id: userID, album_id: albumID })

        res.json({})
    }),
}