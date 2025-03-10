const express = require('express');
const userRouter = require('./userRouter');
const albumRouter = require('./albumRouter');
const artistRouter = require('./artistRouter');
const reviewRouter = require('./reviewRouter')
const userController = require("../controllers/userController");
const artistController = require("../controllers/artistController");
const reviewController = require("../controllers/reviewController");
const albumController = require("../controllers/albumController");

const router = express.Router();

router.use('/users', userRouter);
router.use('/albums', albumRouter);
router.use('/artists', artistRouter);
router.use('/reviews', reviewRouter)
router.get("/user/:username", userController.readID);
router.put("/user/:username", userController.update);
router.get("/artist/:artistname", artistController.readID);
router.put("/artist/:artistname", artistController.update);

router.get("/user/readUserID/:id", reviewController.readUserID);
router.get("/album/readAlbumID/:id", reviewController.readAlbumID);

router.get("/album/:albumID", albumController.readID);

module.exports = router;