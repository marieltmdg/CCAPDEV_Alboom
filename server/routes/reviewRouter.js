const { Router } = require("express")
const reviewRouter = Router()
const reviewController = require("../controllers/reviewController")

reviewRouter.post("/", reviewController.create)

reviewRouter.get("/", reviewController.read)
reviewRouter.get("/:id", reviewController.readID)
reviewRouter.get("/user/:id", reviewController.readUserID)
reviewRouter.get("/album/:id", reviewController.readAlbumID)

reviewRouter.put("/:id", reviewController.update)
reviewRouter.put("/updateReply/:id", reviewController.updateReply)

reviewRouter.patch("/upvote/:reviewID", reviewController.upvote)
reviewRouter.patch("/downvote/:reviewID", reviewController.downvote)

reviewRouter.delete("/:id", reviewController.delete)

module.exports = reviewRouter