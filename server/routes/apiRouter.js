const express = require('express');
const userRouter = require('./userRouter');
const albumRouter = require('./albumRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/albums', albumRouter);

module.exports = router;