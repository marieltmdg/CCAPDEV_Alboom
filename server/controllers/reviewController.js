const asyncHandler = require("express-async-handler")

const Review = require("../models/reviewModel.js")
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
            .populate("album_ids")

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

    update: asyncHandler(async (req, res) => {
        const { userID, albumID } = req.params

        // Update API Endpoint
    }),

    upvote: asyncHandler(async (req, res) => {
        const review = await Review.findById(req.params.reviewID)
        review.upvotes += 1
        await review.save()
        res.json(review)
    }),

    downvote: asyncHandler(async (req, res) => {
        const review = await Review.findById(req.params.reviewID)
        review.downvotes += 1
        await review.save()
        res.json(review)
    }),

    delete: asyncHandler(async (req, res) => {
        const { id } = req.params

        await Review.findByIdAndDelete(id);

        res.json({})
    }),
}