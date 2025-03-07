const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');  

router.route('/:artistname')
    .get(artistController.readID)
    .put(artistController.update)

module.exports = router;