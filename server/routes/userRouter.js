const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.create)

router.route('/:username')
    .get(userController.readID)
    .put(userController.update)

module.exports = router;