const express = require('express');
const userRouter = require('./userRouter');
const albumRouter = require('./albumRouter');
const artistRouter = require('./artistRouter');
const reviewRouter = require('./reviewRouter')
const userController = require("../controllers/userController");
const artistController = require("../controllers/artistController");

const router = express.Router();

router.use('/users', userRouter);
router.use('/albums', albumRouter);
router.use('/artists', artistRouter);
router.use('/reviews', reviewRouter)
router.get("/user/:username", userController.readID);
router.put("user/:username", userController.update);
router.get("/artist/:artistname", artistController.readID);
router.put("/artist/:artistname", artistController.update);

module.exports = router;