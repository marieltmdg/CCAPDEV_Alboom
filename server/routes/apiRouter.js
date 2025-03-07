const express = require('express');
const userRouter = require('./userRouter');
const albumRouter = require('./albumRouter');
const userController = require("../controllers/userController");
const artistController = require("../controllers/artistController");

const router = express.Router();

router.use('/users', userRouter);
router.use('/albums', albumRouter);
router.get("/user/:username", userController.readID);
router.get("/artist/:artistname", artistController.readID);

module.exports = router;