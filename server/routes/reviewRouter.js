const { Router } = require("express")
const reviewRouter = Router()
const reviewController = require("../controllers/reviewController")

reviewRouter.post("/", reviewController.create)

reviewRouter.get("/", reviewController.read)
reviewRouter.get("/user/:id", reviewController.readUserID)
reviewRouter.get("/album/:id", reviewController.readAlbumID)

reviewRouter.put("/user/:userID/album/:albumID", reviewController.update)

reviewRouter.patch("/upvote/:reviewID", reviewController.upvote)
reviewRouter.patch("/downvote/:reviewID", reviewController.downvote)

reviewRouter.delete("/user/:userID/album/:albumID", reviewController.delete)

module.exports = reviewRouter