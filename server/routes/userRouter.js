const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.create)
    .get(userController.read);

router.route('/:username')
    .get(userController.readID)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;