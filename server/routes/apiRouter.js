const express = require('express');
const userRouter = require('./userRouter');
const albumRouter = require('./albumRouter');
const artistRouter = require('./artistRouter');
const reviewRouter = require('./reviewRouter')

const router = express.Router();

router.use('/user', userRouter);
router.use('/albums', albumRouter);
router.use('/artist', artistRouter);
router.use('/reviews', reviewRouter)

module.exports = router;