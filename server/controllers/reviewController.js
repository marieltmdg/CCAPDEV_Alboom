const asyncHandler = require("express-async-handler")

const reviewModel = require("../models/reviewModel.js")

module.exports = {
    create: asyncHandler(async (req, res) => {
        // Create API Endpoint
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
            .populate("review_id")

        res.json(reviews)    
    }),

    readreviewID: asyncHandler(async (req, res) => {
        const reviews = await reviewModel.findById({ review_id: req.params.id }).populate("artist_id")
            .populate("user_id")
            .populate("review_id")

        res.json(reviews)    
    }),

    update: asyncHandler(async (req, res) => {
        const { userID, reviewID } = req.params

        // Update API Endpoint
    }),

    delete: asyncHandler(async (req, res) => {
        const { userID, reviewID } = req.params

        await reviewModel.findOneAndDelete({ user_id: userID, review_id: reviewID })

        res.json({})
    }),
}